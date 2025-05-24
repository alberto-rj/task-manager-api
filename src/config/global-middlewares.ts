import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import env from '@/config/env';

export const setupGlobalMiddlewares = (app: Express) => {
  app.use(helmet());
  app.use(compression());
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  if (!env.isTest()) {
    app.use(morgan('dev'));
  }
};
