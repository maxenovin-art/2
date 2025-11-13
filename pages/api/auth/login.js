import prisma from '../../../lib/prisma';
import { comparePassword, signToken } from '../../../lib/auth';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({where:{email}});
  if(!user) return res.status(401).json({error:'invalid'});
  const ok = await comparePassword(password, user.password);
  if(!ok) return res.status(401).json({error:'invalid'});
  const token = signToken({id:user.id, email:user.email, role:user.role});
  res.json({user:{id:user.id,email:user.email,name:user.name,role:user.role}, token});
}
