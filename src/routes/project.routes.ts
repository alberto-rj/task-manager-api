import { Router } from 'express';

const projectRoutes = Router();

projectRoutes.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Get projects`,
  });
});

projectRoutes.post('/', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Create project`,
  });
});

projectRoutes.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Get project`,
  });
});

projectRoutes.patch('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Update project`,
  });
});

projectRoutes.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Delete project`,
  });
});

// project member routes
projectRoutes.post('/:id/members', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Add member to the project`,
  });
});

projectRoutes.patch('/:id/members/:userId', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Update member role to the project`,
  });
});

projectRoutes.delete('/:id/members/:userId', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Delete member from the project`,
  });
});

export { projectRoutes };
