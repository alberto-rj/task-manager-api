import { Router } from 'express';

const routes = Router();

routes.get('/health', (req, res) => {
  res.status(200).json({ success: true, timestamp: new Date().toISOString() });
});

export { routes };
