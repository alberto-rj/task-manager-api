import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import env from '@/config/env';
import { IAuthPayload } from '@/types/i-auth-payload';

export function generateAccessToken(payload: IAuthPayload) {
  return jwt.sign(payload, env.auth.jwtSecret, {
    expiresIn: env.auth.jwtExpiresIn,
  });
}

export function verifyToken(token: string): IAuthPayload | null {
  try {
    const decoded = jwt.verify(token, env.auth.jwtSecret);
    return decoded as IAuthPayload;
  } catch (error) {
    return null;
  }
}

export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex');
}
