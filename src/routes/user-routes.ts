import { Router } from 'express';

import { newUserController } from '@/controllers/user-controller';
import { newAuthMiddleware } from '@/middlewares/auth-middleware';
import { newIUserRepository } from '@/utils/repository-factory';
import { newIUserService } from '@/utils/service-factory';

const userService = newIUserService(newIUserRepository());
const authMiddleware = newAuthMiddleware(userService);
const userController = newUserController(userService);

const userRoutes = Router();

userRoutes.get('/me', authMiddleware.authenticate, userController.getProfile);

userRoutes.patch(
  '/me',
  authMiddleware.authenticate,
  userController.updateProfile,
);

userRoutes.patch(
  '/me/username',
  authMiddleware.authenticate,
  userController.updateUsername,
);

userRoutes.patch(
  '/me/email',
  authMiddleware.authenticate,
  userController.updateEmail,
);

userRoutes.patch(
  '/me/inactive',
  authMiddleware.authenticate,
  userController.inactive,
);

userRoutes.get('/', authMiddleware.authenticate, userController.getAllByQuery);

userRoutes.get('/:id', authMiddleware.authenticate, userController.getById);

userRoutes.patch(
  '/:id/role',
  authMiddleware.authenticate,
  authMiddleware.authorize(['ADMIN']),
  userController.updateRole,
);

userRoutes.patch(
  '/:id/is-active',
  authMiddleware.authenticate,
  authMiddleware.authorize(['ADMIN']),
  userController.updateIsActive,
);

export { userRoutes };
