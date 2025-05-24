import express from 'express';

import env from '@/config/env';
import { setupErrorHandling } from '@/config/error-handling';
import { setupGlobalMiddlewares } from '@/config/global-middlewares';
import { setupRoutes } from '@/config/routes';
import { logger } from '@/utils/logger';

const app = express();

const setup = () => {
  setupGlobalMiddlewares(app);
  setupRoutes(app);
  setupErrorHandling(app);
};

const start = () => {
  setup();
  if (!env.isTest()) {
    app.listen(env.server.port, () => {
      logger.info(`Server running on port ${env.server.port}`);
    });
  }
};

export { app, setup, start };
