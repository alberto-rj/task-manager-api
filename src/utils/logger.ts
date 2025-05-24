import pino from 'pino';
import env from '@/config/env';

export const logger = pino({
  level: env.isProduction() ? 'info' : 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
