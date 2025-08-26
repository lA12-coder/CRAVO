// src/utils/logger.js
const winston = require('winston');

// Define a custom format that redacts sensitive information
const format = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.json(),
  winston.format(info => {
    // Redact sensitive data
    if (info.user && info.user.email) {
      info.user.email = '***REDACTED***';
    }
    if (info.user && info.user.phone) {
      info.user.phone = '***REDACTED***';
    }
    return info;
  })()
);

const transports = [
  new winston.transports.Console({
    level: process.env.LOG_LEVEL || 'info',
    handleExceptions: true,
  }),
];

/**
 * @description Winston logger instance configured for JSON output and PII redaction.
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
  format: format,
  transports: transports,
  exitOnError: false
});

// Create a stream for Morgan
logger.stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

module.exports = { logger };
