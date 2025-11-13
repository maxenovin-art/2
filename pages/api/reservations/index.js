import prisma from '../../../lib/prisma';
import getUserFromReq from '../_helpers/getUser';

// POST: create a reservation (with concurrency check)
// GET: list reservations (with optional filters)
export default async function handler(req, res){
  if(req.method === 'POST'){
    const user = await getUserFromReq(req);
    if(!user) return res.status(401).json({error:'unauth'});

    const { resource, startAt, endAt } = req.body;
    if(!resource || !startAt || !endAt) return res.status(400).json({error:'missing'});

    // Concurrency: check overlap inside a transaction
    const start = new Date(startAt);
    const end = new Date(endAt);
    try{
      const created = await prisma.$transaction(async (tx)=>{
        const conflict = await tx.reservation.findFirst({
          where:{
            resource,
            status: 'confirmed',
            AND: [
              { startAt: { lt: end }},
              { endAt: { gt: start }}
            ]
          },
          lock: { mode: 'ForUpdate' } // Prisma will translate appropriately if supported
        });
        if(conflict) throw new Error('conflict');
        const r = await tx.reservation.create({
          data:{
            userId: user.id,
            resource,
            startAt: start,
            endAt: end,
            status: 'confirmed'
          }
        });
        return r;
      });
      // simulate notifications (email/SMS)
      // In production replace with background worker or queue
      res.json({reservation: created});
    }catch(e){
      if(e.message === 'conflict') return res.status(409).json({error:'conflict'});
      console.error(e);
      return res.status(500).json({error:'server'});
    }

  } else if(req.method === 'GET'){
    const { resource, from, to } = req.query;
    const where = {};
    if(resource) where.resource = resource;
    if(from || to){
      where.AND = [];
      if(from) where.AND.push({ endAt: { gt: new Date(from) }});
      if(to) where.AND.push({ startAt: { lt: new Date(to) }});
    }
    const list = await prisma.reservation.findMany({where, include:{user:true}, orderBy:{startAt:'asc'}});
    res.json({list});
  } else {
    res.status(405).end();
  }
}
