/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import { createDir } from '../file/createDir';
import config from '../../config';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const logDir = 'logs';
const errorLogDir = path.join(logDir, 'error');
const successLogDir = path.join(logDir, 'success');

createDir(successLogDir);
createDir(errorLogDir);

const myFormat = printf(({ level, message, label, timestamp, ...rest }) => {
  const restString = Object.keys(rest).length ? JSON.stringify(rest, null, 2) : '';
  return `${timestamp} [${label}] ${level}: ${message} ${restString}`;
});

/**
 * Logger for success messages
 */
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Campus Couch' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(successLogDir, '%DATE%-success.log'),
      datePattern: 'DD-MM-YYYY-HH',
      maxSize: '20m',
      maxFiles: '1d',
    }),
  ],
});

/**
 * Logger for error messages
 */
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Campus Couch' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(errorLogDir, '%DATE%-error.log'),
      datePattern: 'DD-MM-YYYY-HH',
      maxSize: '20m',
      maxFiles: '1d',
    }),
  ],
});

export { errorLogger, logger };
