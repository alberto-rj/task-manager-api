import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { logger } from '@/utils/logger';

const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

const morganFormat =
  ':method :url :status :res[content-length] - :response-time ms';

export const requestLogger = morgan(morganFormat, { stream });
