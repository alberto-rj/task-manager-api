import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';
import { logger } from '../utils/logger';
import resBody from '../utils/response-body';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.error(error);

  if (error instanceof AppError) {
    res.status(error.code).json(error.format());
    return;
  }

  res.status(500).json(
    resBody.error({
      code: 500,
      name: 'InternalServerError',
      message: 'Unexpected error',
    }),
  );
};
