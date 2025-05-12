import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/app-error';
import { logger } from '@/utils/logger';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }

  logger.error(`[Internal Error] ${error.message}`, {
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  return res
    .status(500)
    .json({ success: false, message: 'Internal sever error' });
}
