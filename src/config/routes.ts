import { Express } from 'express';
import { routes } from '../routes';

export const setupRoutes = (app: Express) => {
  app.use('/api', routes);
};
