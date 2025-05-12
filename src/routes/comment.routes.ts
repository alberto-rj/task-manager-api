import { Router } from 'express';

const commentRoutes = Router();

commentRoutes.patch('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Updated comment`,
  });
});

commentRoutes.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Delete comment`,
  });
});

export { commentRoutes };
