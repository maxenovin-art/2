import { verifyToken } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

export default async function getUserFromReq(req){
  const auth = req.headers.authorization || '';
  const token = auth.replace('Bearer ', '');
  const data = verifyToken(token);
  if(!data) return null;
  const user = await prisma.user.findUnique({where:{id:data.id}});
  return user;
}
