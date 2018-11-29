'use strict';

const winston = require('winston');

const tsFormat = () => new Date().toISOString();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.File({filename: 'combined.log'})
  ]
});

/**
 * Extends the Error object with additional features.
 * @param {String} message -- Custom message for this error.
 * @param {Number} errorCode -- Custom error code for this error
 */
class HttpError extends Error {
  constructor(message, errorCode, statusCode) {
    super(message);
    this.name = 'HttpError';
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    
    logger.log({
      level: 'error',
      message: message,
      errorCode: errorCode,
      statusCode: statusCode
    });
  }
}

const errors = {
  // Queries - 1xxxx
  // Mutations - 2xxxx
  unauthorizedCreationAttempt: 20101,
  invalidFBParent: 20102,
  teamIdNotFind: 20103,
  partialSlugChangeAttempt: 20204,
  callerNotTeamMember: 20401,
  callerNotOwner: 20402,
  senderNotProvidedFBCreator: 20501,
  adminAlreadyExists: 20502,
  nonTeamMemberAdminAttempt: 20503,
  adminDoesNotExist: 20601,
  internal: 500
};

module.exports = {
  logger: logger,
  errors: errors,
  HttpError: HttpError
};
