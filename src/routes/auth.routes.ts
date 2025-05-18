import { Router } from 'express';

import { newAuthController } from '../controllers/auth.controller';
import { RepositoryFactory } from '../utils/repository-factory';
import { ServiceFactory } from '../utils/service-factory';
import { newAuthMiddleware } from '../middlewares/auth.middleware';

const refreshTokenRepo = RepositoryFactory.newIRefreshTokenRepository();
const userRepo = RepositoryFactory.newIUserRepository();
const userService = ServiceFactory.newIUserService(userRepo);
const authService = ServiceFactory.newIAuthService(
  refreshTokenRepo,
  userRepo,
  userService,
);
const authMiddleware = newAuthMiddleware(userService);
const authController = newAuthController(authService);
const authRoutes = Router();

authRoutes.post(
  '/signup',
  authMiddleware.validateSignup,
  authController.signup,
);

authRoutes.post(
  '/signin',
  authMiddleware.validateSignin,
  authController.signin,
);

export { authRoutes };
