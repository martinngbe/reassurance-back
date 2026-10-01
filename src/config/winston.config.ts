import * as winston from 'winston';
//import * as DailyRotateFile from 'winston-daily-rotate-file';

import DailyRotateFile = require('winston-daily-rotate-file');

const { format, transports } = winston;

// Format personnalisé pour ajouter le timestamp et le correlationId
const customFormat = format.printf(({ level, message, timestamp, context, method, correlationId, ...meta }) => {
  return JSON.stringify({
    timestamp,
    level,
    context: context || 'Application',
    method: method || 'N/A',
    correlationId: correlationId || 'N/A',
    message,
    ...meta,
  });
});

export const winstonConfig = {
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    process.env.NODE_ENV === 'production' ? customFormat : format.combine(format.colorize(), customFormat),
  ),
  transports: [
    new transports.Console(),
    // Rotation des fichiers : un fichier par jour, gardé 14 jours
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
      level: 'error',
    }),
  ],
};