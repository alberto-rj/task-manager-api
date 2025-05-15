import { Request, Response, Express } from 'express';

import { errorHandler } from '../middlewares/error-handler.middleware';

export const setupErrorHandling = (app: Express) => {
  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use(errorHandler);
};
