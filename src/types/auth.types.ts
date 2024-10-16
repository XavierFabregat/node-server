import { JwtPayload } from 'jsonwebtoken';

export interface RefreshJwtPayload extends JwtPayload {
  userId: string;
  tokenVersion?: number;
}

export interface AccessJwtPayload extends JwtPayload {
  userId: string;
}
