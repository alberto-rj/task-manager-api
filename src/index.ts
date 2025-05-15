import express from 'express';

import { env } from './config/env';
import { setupErrorHandling } from './config/error-handling';
import { setupGlobalMiddlewares } from './config/global-middlewares';
import { setupRoutes } from './config/routes';
import { logger } from './utils/logger';

const app = express();

setupGlobalMiddlewares(app);
setupRoutes(app);
setupErrorHandling(app);

if (!env.isTest()) {
  app.listen(env.port, () => {
    logger.info(`Server running on port ${env.port}`);
  });
}

export { app };
