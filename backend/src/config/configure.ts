import dotenv from 'dotenv';
import { resolve } from 'path';
import { logger } from '../util/logger/logger';
import colors from 'colors';
import fs from 'fs';

export const envPath = resolve(process.cwd(), '.env');

logger.info(colors.yellow('Current working directory:'), process.cwd());
logger.info(colors.yellow('Looking for .env file at:'), envPath);

if (fs.existsSync(envPath)) {
  logger.info(colors.green('.env file found'));
  const envContents = fs.readFileSync(envPath, 'utf8');
  logger.info(colors.yellow('.env file contents:'), envContents);
} else {
  logger.warn(colors.red('.env file not found'));
}

const result = dotenv.config({ path: envPath });

if (result.error) {
  logger.warn(colors.red('Error loading .env file:'), result.error);
} else {
  logger.info(colors.green('Environment variables loaded successfully'));
  logger.info(colors.yellow('Process environment:'), {
    PORT: process.env.PORT,
    HREF: process.env.HREF,
    IP_ADDRESS: process.env.IP_ADDRESS
  });
}

export default process.env;
