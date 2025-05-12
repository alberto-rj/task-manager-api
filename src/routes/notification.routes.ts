import { Router } from 'express';

const notificationRoutes = Router();

notificationRoutes.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Get notifications`,
  });
});

notificationRoutes.patch('/:id/read', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Mark notification as read`,
  });
});

notificationRoutes.patch('/:id/read-all', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Mark all notification as read`,
  });
});

export { notificationRoutes };
