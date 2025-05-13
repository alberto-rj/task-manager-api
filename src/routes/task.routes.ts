import { Router } from 'express';

const taskRoutes = Router();

taskRoutes.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Create task`,
  });
});

taskRoutes.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Get tasks`,
  });
});

taskRoutes.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Get task`,
  });
});

taskRoutes.patch('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Update task`,
  });
});

taskRoutes.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Delete task`,
  });
});

taskRoutes.patch('/:id/status', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Update task status`,
  });
});

taskRoutes.patch('/:id/assign', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Assign task to user`,
  });
});

export { taskRoutes };
