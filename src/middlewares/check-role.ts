import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/app-error';

export function checkRole(role: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401);
    }

    if (req.user.role !== role) {
      throw new AppError('User cannot access the resources', 403);
    }

    return next();
  };
}
