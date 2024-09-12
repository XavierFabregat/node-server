import { Router } from 'express';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import { isAuth } from '../../middleware/isAuth.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', isAuth, userRouter);

export default router;
