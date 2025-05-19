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

projectRoutes.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Get projects`,
  });
});

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

projectRoutes.delete(
  '/:projectId',
  authMiddleware.authenticate,
  projectController.deleteProject,
);

export { projectRoutes };
