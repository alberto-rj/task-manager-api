import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { routes } from '@/routes';
import { errorHandler } from '@/middlewares/error-handler';
import { swaggerOptions } from '@/config/swagger';

const app = express();

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

// Swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.setup(swaggerSpec));

// Routes
app.use(routes);

// Error handler
app.use(errorHandler);

export { app };
