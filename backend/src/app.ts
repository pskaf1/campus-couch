import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { errorLogger, logger } from './util/logger/logger';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { corsOptions } from './config/cors';
import { morganConfig } from './config/morgan';
import { config } from './config';
import { logger as requestLogger } from './middleware/requestLogger';
import { rateLimiter } from './middleware/rateLimiter';
import { routes } from './app/routes';
import { logger as responseLogger } from './middleware/responseLogger';

/**
 * The main application instance
 *
 * This is the main application instance that sets up the Express server.
 * It configures middleware, routes, and error handling.
 */
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan(morganConfig.format, morganConfig.options));
app.use(requestLogger);
app.use(responseLogger);
app.use(rateLimiter);

// Log startup information
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/') {
    logger.info('Root route accessed', {
      method: req.method,
      path: req.path,
      query: req.query,
      headers: req.headers
    });
  }
  next();
});

// Root route handler
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Campus Couch API',
    version: '1.0.0',
    documentation: 'https://campus-couch-22y8-r2he89k38-patrick-skafs-projects.vercel.app/docs',
    availableEndpoints: {
      auth: '/api/v1/auth',
      products: '/api/v1/products',
      orders: '/api/v1/orders',
      cart: '/api/v1/cart',
      wishlist: '/api/v1/wishlist',
      trades: '/api/v1/trades',
      bundles: '/api/v1/bundles',
      reviews: '/api/v1/reviews',
      payment: '/api/v1/payment'
    },
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Test route - always responds
app.get('/test', (_, res) => {
  logger.info('Test route accessed');
  res.json({ 
    message: 'Test route is working',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    nodeVersion: process.version
  });
});

// API routes
app.use('/api/v1', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Log all routes
app._router.stack.forEach((r: any) => {
  if (r.route && r.route.path) {
    logger.info(`Route registered: ${r.route.path}`);
  }
});

// Export the Express API
export default app;
