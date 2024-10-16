import User from '../models/user.model';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { APP } from '../config';

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, APP.ACCESS_TOKEN_SECRET, {
    expiresIn: APP.ACCESS_TOKEN_LIFETIME,
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    APP.REFRESH_TOKEN_SECRET,
    {
      expiresIn: APP.REFRESH_TOKEN_LIFETIME,
    }
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie(APP.JWT_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });
};
