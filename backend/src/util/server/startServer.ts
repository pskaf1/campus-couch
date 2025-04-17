import colors from 'colors';
import { createServer } from 'http';
import app from '../../app';
import config from '../../config';
import { errorLogger, logger } from '../logger/logger';
import shutdownServer from './shutdownServer';
import connectDB from './connectDB';
import { AdminServices } from '../../app/modules/admin/Admin.service';
import killPort from 'kill-port';

const {
  server: { port, ip_address, href, name },
} = config;

/**
 * Starts the server
 *
 * This function creates a new HTTP server instance and connects to the database.
 * It also seeds the admin user if it doesn't exist in the database.
 */
export default async function startServer() {
  try {
    logger.info(colors.yellow('Starting server with configuration:'), {
      port,
      ip_address,
      href,
      name,
      env: process.env.NODE_ENV
    });

    try {
      await killPort(port);
    } catch (error) {
      logger.warn(`Could not kill port ${port}, continuing anyway`);
    }

    await connectDB();
    await AdminServices.seed();

    return new Promise((resolve, reject) => {
      const server = createServer(app);
      
      server.on('error', (error: any) => {
        if (error.code === 'EADDRINUSE') {
          logger.error(`Port ${port} is already in use`);
        }
        reject(error);
      });

      server.listen(Number(port), '0.0.0.0', () => {
        logger.info(colors.yellow(`🚀 ${name} is running on ${href}`));
        resolve(server);
      });

      ['SIGTERM', 'SIGINT', 'unhandledRejection', 'uncaughtException'].forEach(
        signal =>
          process.on(signal, (err?: Error) => {
            shutdownServer(server, signal, err);
          }),
      );
    });
  } catch (error) {
    errorLogger.error(colors.red('❌ Server startup failed!'), error);
    process.exit(1);
  }
}
