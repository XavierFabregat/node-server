import type { Request, Response } from 'express';
import bcryptUtils from '../utils/crypto.utils';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { APP } from '../config';
import { sanitizeOutput } from '../utils/user.utils';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '../utils/auth.utils';
import { ResponseUtil } from '../utils/res.util';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    return ResponseUtil.sendError(res, 'Missing required fields');
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return ResponseUtil.sendError(res, 'Invalid email/password');
  }

  const isValidPassword = await bcryptUtils.comparePassword(
    password,
    user.password
  );

  if (!isValidPassword) {
    return ResponseUtil.sendError(res, 'Invalid email/password');
  }

  const accessToken = createAccessToken(user);

  sendRefreshToken(res, createRefreshToken(user));

  return ResponseUtil.sendSuccess(res, {
    user: sanitizeOutput(user, true),
    accessToken,
  });
}

export async function register(req: Request, res: Response) {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return ResponseUtil.sendError(res, 'Missing required fields');
  }
  const hashedPassword = await bcryptUtils.hashPassword(password);

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return ResponseUtil.sendError(res, 'This email is already in use.');
  }

  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  const accessToken = createAccessToken(user);

  sendRefreshToken(res, createRefreshToken(user));

  return ResponseUtil.sendSuccess(res, {
    user: sanitizeOutput(user, true),
    accessToken,
  });
}

export function logout(req: Request, res: Response) {
  // Clear the cookie by setting it to an empty value and a past expiry date
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
  });
  return ResponseUtil.sendSuccess(res, {
    message: 'Logout successful',
    status: 200,
  });
}
