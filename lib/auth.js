import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

export async function hashPassword(plain){ return await bcrypt.hash(plain, 10); }
export async function comparePassword(plain, hash){ return await bcrypt.compare(plain, hash); }

export function signToken(payload, opts={}){ return jwt.sign(payload, JWT_SECRET, {expiresIn: opts.expiresIn||'7d'}); }
export function verifyToken(token){ try{ return jwt.verify(token, JWT_SECRET); }catch(e){ return null; } }
