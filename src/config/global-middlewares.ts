import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './env';

export const setupGlobalMiddlewares = (app: Express) => {
  // Security
  app.use(helmet());
  app.use(cors());

  // Parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Compression
  app.use(compression());

  // Logging
  if (!env.isTest()) {
    app.use(morgan('dev'));
  }
};
