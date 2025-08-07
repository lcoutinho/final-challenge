import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { PluginEnvironment } from '../types';

export const corsMiddleware = () => {
  const router = Router();

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

router.use(
    '/fetch-employees',
    createProxyMiddleware({
      target: 'https://mocki.io',
      changeOrigin: true,
      pathRewrite: { '^/fetch-employees': '' },
    }),
  );

  return router;
};