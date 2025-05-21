import { Router } from 'express';

import { newProjectController } from '../controllers/project-controller';
import { newIProjectService, newIUserService } from '../utils/service-factory';
import {
  newIProjectRepository,
  newIUserRepository,
} from '../utils/repository-factory';
import { newAuthMiddleware } from '../middlewares/auth-middleware';

const authMiddleware = newAuthMiddleware();

const projectController = newProjectController(
  newIProjectService(
    newIProjectRepository(),
    newIUserService(newIUserRepository()),
  ),
);

const projectRoutes = Router();

projectRoutes.get(
  '/',
  authMiddleware.authenticate,
  projectController.getProjects,
);

projectRoutes.post(
  '/',
  authMiddleware.authenticate,
  projectController.createProject,
);

projectRoutes.get(
  '/:projectId',
  authMiddleware.authenticate,
  projectController.getProject,
);

projectRoutes.patch(
  '/:projectId',
  authMiddleware.authenticate,
  projectController.updateProject,
);

projectRoutes.patch(
  '/:projectId/archive',
  authMiddleware.authenticate,
  projectController.archiveProject,
);

projectRoutes.delete(
  '/:projectId',
  authMiddleware.authenticate,
  projectController.deleteProject,
);

export { projectRoutes };
