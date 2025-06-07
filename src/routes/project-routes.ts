import { Router } from 'express';

import { newProjectController } from '@/controllers/project-controller';
import { newIProjectService, newIUserService } from '@/utils/service-factory';
import {
  newIProjectRepository,
  newIUserRepository,
} from '@/utils/repository-factory';
import { newAuthMiddleware } from '@/middlewares/auth-middleware';

const authMiddleware = newAuthMiddleware();

const projectController = newProjectController(
  newIProjectService(
    newIProjectRepository(),
    newIUserService(newIUserRepository()),
  ),
);

const projectRoutes = Router();

projectRoutes.get('/', authMiddleware.authenticate, projectController.readAll);

projectRoutes.post('/', authMiddleware.authenticate, projectController.create);

projectRoutes.get('/:id', authMiddleware.authenticate, projectController.read);

projectRoutes.patch(
  '/:id',
  authMiddleware.authenticate,
  projectController.change,
);

projectRoutes.patch(
  '/:id/archive',
  authMiddleware.authenticate,
  projectController.changeIsArchived,
);

projectRoutes.delete(
  '/:id',
  authMiddleware.authenticate,
  projectController.remove,
);

export { projectRoutes };
