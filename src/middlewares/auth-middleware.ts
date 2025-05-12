import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@/utils/app-error';

interface TokenPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
  sub: string;
}

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: string;
      };
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token not provided', 401);
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer') {
    throw new AppError('Invalid token format', 401);
  }

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'default-secret',
    ) as TokenPayload;

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
