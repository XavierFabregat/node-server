import type { Request, Response } from 'express';
import bcryptUtils from '../utils/crypto.utils';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { APP } from '../config';
import { sanitizeOutput } from '../utils/user.utils';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Missing required fields');
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).send('Invalid email/password');
  }

  const isValidPassword = await bcryptUtils.comparePassword(
    password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(400).send('Invalid email/password');
  }

  const token = jwt.sign({ id: user.id }, APP.JWT_SECRET!, { expiresIn: '1h' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only set secure cookies over HTTPS
    sameSite: 'lax', // Controls cross-site request behavior
    maxAge: 60 * 60 * 1000, // 1 hour  });
  });

  return res.status(200).send(sanitizeOutput(user, true));
}

export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).send('Missing required fields');
  }
  const hashedPassword = await bcryptUtils.hashPassword(password);

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return res.status(400).send('This email is already in use.');
  }

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  const token = jwt.sign({ id: user.id }, APP.JWT_SECRET!, { expiresIn: '1h' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
  });

  return res.status(201).send(sanitizeOutput(user, true));
}

export function logout(req: Request, res: Response) {
  // Clear the cookie by setting it to an empty value and a past expiry date
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
  });
  return res.status(200).send({ message: 'Logout successful', status: 200 });
}
