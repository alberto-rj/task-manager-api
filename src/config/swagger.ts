import { Options } from 'swagger-js-doc';

export const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST com Node.js e TypeScript',
      version: '1.0.0',
      description:
        'Documentação da API REST construída com Express e TypeScript',
      contact: {
        name: 'Alberto José',
        email: 'albertorauljose2@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearAuth: {
          type: 'http',
          scheme: 'bearer',
          bearFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts', './src/controllers/*.ts'],
};
