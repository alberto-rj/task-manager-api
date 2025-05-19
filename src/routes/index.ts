import { Router } from 'express';
import { authRoutes } from './auth-routes';
import { userRoutes } from './user-routes';
import { projectRoutes } from './project-routes';
import { taskRoutes } from './task-routes';

const routes = Router();

routes.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
  });
});

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/projects', projectRoutes);
routes.use('/tasks', taskRoutes);

export { routes };
