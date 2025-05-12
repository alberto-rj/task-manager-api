import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';

// import { swaggerOptions } from '@/config/swagger';

// import { errorHandler } from './middlewares/error-handler';
import { logger } from './utils/logger';
import { env } from './config/env';
import { routes } from './routes';

const app = express();

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

if (!env.isProduction()) {
  app.use(morgan('dev'));
}
// // Swagger
// const swaggerSpec = swaggerJSDoc(swaggerOptions);
// app.use('/docs', swaggerUi.setup(swaggerSpec));

// Error handler
// app.use(errorHandler);

// Routes
app.use('/api', routes);

if (!env.isTest()) {
  app.listen(env.port, () => {
    logger.log(`Server running on port ${env.port}`);
  });
}

export { app };
