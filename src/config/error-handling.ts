import { Express } from 'express';

import { errorHandler } from '@/middlewares/error-handler-middleware';

import { notFoundHandler } from '@/middlewares/not-found-handler';

export const setupErrorHandling = (app: Express) => {
  app.use(notFoundHandler);
  app.use(errorHandler);
};
