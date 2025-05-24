import jwt from 'jsonwebtoken';

import env from '@/config/env';
import { IUserPayload } from '@/dtos/auth.dto';
import crypto from 'crypto';

export function generateAccessToken(payload: IUserPayload) {
  return jwt.sign(payload, env.auth.jwtSecret, {
    expiresIn: env.auth.jwtExpiresIn,
  });
}

export function verifyToken(token: string): IUserPayload | null {
  try {
    const decoded = jwt.verify(token, env.auth.jwtSecret);
    return decoded as IUserPayload;
  } catch (error) {
    return null;
  }
}

export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex');
}
