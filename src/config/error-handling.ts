import { Request, Response, Express, NextFunction } from 'express';

import { errorHandler } from '@/middlewares/error-handler-middleware';
import { NotFoundError } from '@/utils/app-error';

export const setupErrorHandling = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    try {
      throw new NotFoundError('Resource not found');
    } catch (error) {
      next(error);
    }
  });

  app.use(errorHandler);
};
