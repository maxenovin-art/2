import prisma from '../../../lib/prisma';
import getUserFromReq from '../_helpers/getUser';

export default async function handler(req, res){
  const { id } = req.query;
  const user = await getUserFromReq(req);
  if(!user) return res.status(401).json({error:'unauth'});

  if(req.method === 'DELETE'){
    // cancel reservation: only owner or admin
    const r = await prisma.reservation.findUnique({where:{id: Number(id)}});
    if(!r) return res.status(404).json({error:'notfound'});
    if(r.userId !== user.id && user.role !== 'admin') return res.status(403).json({error:'forbidden'});
    const updated = await prisma.reservation.update({
      where:{id: Number(id), version: r.version},
      data:{status:'cancelled', version: {increment:1}}
    }).catch(()=>null);
    if(!updated) return res.status(409).json({error:'conflict or stale'});
    // simulate notifications...
    res.json({reservation: updated});
  } else {
    res.status(405).end();
  }
}
