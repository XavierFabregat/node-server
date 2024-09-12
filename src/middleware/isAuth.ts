import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

interface JwtPayload {
  id: string;
}

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  // Verify token
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    console.log(id);
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized');
  }
}
