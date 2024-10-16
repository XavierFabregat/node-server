import { Request, Response, NextFunction } from 'express';
export async function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('Error caught in errorHandler middleware', error);
  res.status(500).send('An error occurred, please try again later.');
  next();
}
