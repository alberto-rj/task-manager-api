import { Router } from 'express';

const tagRoutes = Router();

tagRoutes.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Create tag`,
  });
});

tagRoutes.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Get tags`,
  });
});

tagRoutes.patch('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Update tag`,
  });
});

tagRoutes.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Delete tag`,
  });
});

export { tagRoutes };
