import { Router } from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import refreshTokenRouter from './refreshToken.router'
import { isAuth } from '../../middleware/isAuth';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', isAuth, userRouter);
router.use('/refresh-token', refreshTokenRouter);

export default router;
