import type { Request, Response } from 'express';
import { sanitizeOutput } from '../utils/user.utils';

export function me(req: Request, res: Response) {
  res.json(sanitizeOutput(req.user, true));
}
