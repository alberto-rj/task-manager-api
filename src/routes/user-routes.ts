import { Router } from 'express';

import { newUserController } from '@/controllers/user-controller';
import { newAuthMiddleware } from '@/middlewares/auth-middleware';
import { newIUserRepository } from '@/utils/repository-factory';
import { newIUserService } from '@/utils/service-factory';

const authMiddleware = newAuthMiddleware();

const userController = newUserController(newIUserService(newIUserRepository()));

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

userRoutes.delete(
  '/me',
  authMiddleware.authenticate,
  userController.deleteProfile,
);

userRoutes.get('/', authMiddleware.authenticate, userController.getAllByQuery);

userRoutes.get('/:id', authMiddleware.authenticate, userController.getById);

export { userRoutes };
