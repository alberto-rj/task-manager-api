import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: () => process.env.NODE_ENV === 'production',
  isDevelopment: () => process.env.NODE_ENV === 'development',
  isTest: () => process.env.NODE_ENV === 'test',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};
