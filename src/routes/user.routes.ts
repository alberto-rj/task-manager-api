import { Router } from 'express';

const userRoutes = Router();

userRoutes.get('/me', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Get user profile`,
  });
});

userRoutes.get('/:username', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Get public user profile`,
  });
});

userRoutes.put('/me', (req, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Update my profile`,
  });
});

export { userRoutes };
