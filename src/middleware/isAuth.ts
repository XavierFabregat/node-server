import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} from '../utils/auth.utils';
import { AccessJwtPayload, RefreshJwtPayload } from '../types/auth.types';
import { APP } from '../config';

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const accessPayload = jwt.verify(
      token,
      APP.ACCESS_TOKEN_SECRET
    ) as AccessJwtPayload;
    const user = await User.findOne({ where: { id: accessPayload.userId } });
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    if (!(error instanceof Error)) return;
    if (error.name === 'JsonWebTokenError') {
      // check if they have a refresh token in the cookie
      const token = req.cookies[APP.JWT_COOKIE_NAME];
      if (!token) {
        return res.status(401).send({
          message: 'Unauthorized',
          status: 401,
          error: true,
          data: null,
          success: false,
        });
      }
      let refreshPayload: RefreshJwtPayload | null = null;
      try {
        refreshPayload = jwt.verify(
          token,
          APP.REFRESH_TOKEN_SECRET
        ) as RefreshJwtPayload;
      } catch (error) {
        if (!(error instanceof Error)) return;
        if (error.name === 'JsonWebTokenError') {
          return res.status(401).send({
            message: 'Unauthorized',
            status: 401,
            error: true,
            data: null,
            success: false,
          });
        }
      }
      if (!refreshPayload) {
        return res.status(401).send({
          message: 'Unauthorized',
          status: 401,
          error: true,
          data: null,
          success: false,
        });
      }
      // token is valid and we can send back an access token
      const user = await User.findOne({
        where: { id: refreshPayload.userId as string },
      });
      if (!user) {
        return res.send({ ok: false, accessToken: '' });
      }

      if (user.tokenVersion !== refreshPayload.tokenVersion) {
        return res.send({ ok: false, accessToken: '' });
      }

      await next();

      sendRefreshToken(res, createRefreshToken(user));

      return res.send({ ok: true, accessToken: createAccessToken(user) });
    }
    console.log('Error in isAuth middleware: ', error);
    return res.status(500).send({
      message: 'Internal Server Error',
      status: 500,
      error: true,
      data: null,
      success: false,
    });
  }
}
