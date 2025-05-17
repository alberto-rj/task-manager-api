import cors from 'cors';
import compression from 'compression';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './env';

export const setupGlobalMiddlewares = (app: Express) => {
  app.use(helmet());
  app.use(express.json());
  app.use(cors());
  app.use(compression());

  if (!env.isTest()) {
    app.use(morgan('dev'));
  }
};
