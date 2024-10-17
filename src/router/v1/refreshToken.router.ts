import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import User from '../../models/user.model';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../../utils/auth.utils';
import { RefreshJwtPayload } from '../../types/auth.types';

const router = Router();

router.post('/', async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log('Error in refreshToken.router.ts: no token');
    return res.status(401).send({
      ok: false,
      accessToken: '',
      error: 'No token provided.',
    });
  }
  let payload: RefreshJwtPayload | null = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!) as RefreshJwtPayload;
  } catch (error) {
    console.log('Error in refreshToken.router.ts:', error);
    return res.status(401).send({
      ok: false,
      accessToken: '',
      error: 'Invalid token.',
    });
  }

  // token is valid and we can send back an access token
  const user = await User.findOne({ where: { id: payload.userId as string } });

  if (!user) {
    console.log('Error in refreshToken.router.ts: no user');
    return res.status(401).send({
      ok: false,
      accessToken: '',
      error: 'User not found.',
    });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    console.log('Error in refreshToken.router.ts: token version mismatch');
    return res.status(401).send({
      ok: false,
      accessToken: '',
      error: 'Token version mismatch.',
    });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

export default router;
