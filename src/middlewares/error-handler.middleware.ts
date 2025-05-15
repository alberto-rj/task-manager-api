import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';
import { logger } from '../utils/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json(error.format());
    return;
  }

  logger.error(error);

  res.status(500).json({ success: false, message: 'Internal server error' });
};
