import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/register', (re, res) => {
  res.status(201).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Registered`,
  });
});

authRoutes.post('/login', (re, res) => {
  res.status(201).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Logged`,
  });
});

authRoutes.post('/refresh', (re, res) => {
  res.status(200).json({
    success: true,
    timeStamp: new Date().toISOString(),
    message: `Token Refreshed`,
  });
});

export { authRoutes };
