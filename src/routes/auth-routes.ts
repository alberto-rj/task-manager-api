import { Router } from 'express';

import { newAuthController } from '@/controllers/auth-controller';
import {
  newIRefreshTokenRepository,
  newIUserRepository,
} from '@/utils/repository-factory';
import { newIAuthService, newIUserService } from '@/utils/service-factory';
import { newAuthMiddleware } from '@/middlewares/auth-middleware';

const authMiddleware = newAuthMiddleware();

const authController = newAuthController(
  newIAuthService(
    newIRefreshTokenRepository(),
    newIUserRepository(),
    newIUserService(newIUserRepository()),
  ),
);

const authRoutes = Router();

authRoutes.post('/register', authController.register);

authRoutes.post('/login', authController.login);

authRoutes.post(
  '/refresh-token',
  authMiddleware.authenticate,
  authController.refreshToken,
);

authRoutes.post('/logout', authMiddleware.authenticate, authController.logout);

export { authRoutes };
