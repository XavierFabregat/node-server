import { Router } from 'express';
import { me } from '../../controllers/user.controller';
const router = Router();

router.get('/me', me);

export default router;
