import {
  createLogger,
  format,
  Logger as WinstonLogger,
} from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export function createWinstonLogger(
  errorLogPath: string,
  infoLogPath: string,
  { maxMB = 10, maxFiles = 5 }: Partial<{ maxMB: number; maxFiles: number }> = {}
): WinstonLogger {
  const logOptions = {
    level: '',
    filename: '',
    datePattern: 'YYYY-MM',
    zippedArchive: true,
    maxSize: `${maxMB}m`,
    maxFiles: maxFiles,
    extension: '.log',
    utc: true,
  };
  return createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.printf(({ level, timestamp, message }) => `${level.toUpperCase()} [${timestamp}] ${message}`),
    ),
    transports: [
      new DailyRotateFile({ ...logOptions, level: 'error', filename: errorLogPath }),
      new DailyRotateFile({ ...logOptions, level: 'info', filename: infoLogPath }),
    ],
  });
}

export function logError(logger: IErrorLogger, error: any): void {
  if (error instanceof Error) {
    logger.error(`${error.message}\n${error.stack}`);
  } else {
    logger.error(String(error));
  }
}
