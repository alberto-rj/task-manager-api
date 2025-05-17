import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { IUserPayload } from '../dtos/auth.dto';

export function generateAccessToken(payload: IUserPayload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export function verifyToken(token: string): IUserPayload | null {
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    return decoded as IUserPayload;
  } catch (error) {
    return null;
  }
}
