// src/utils/errors.js

/**
 * @description Base custom error class for API errors.
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code.
 * @param {string} [type='about:blank'] - The problem type.
 */
class ApiError extends Error {
  constructor(message, statusCode, type = 'about:blank') {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.type = type;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      type: this.type,
      title: this.message,
      status: this.statusCode,
      detail: this.message
    };
  }
}

/**
 * @description 404 Not Found error.
 * @param {string} message - The error message.
 */
class NotFoundError extends ApiError {
  constructor(message = 'Resource not found.') {
    super(message, 404, 'https://httpstatuses.com/404');
  }
}

/**
 * @description 401 Unauthorized error.
 * @param {string} message - The error message.
 */
class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized.') {
    super(message, 401, 'https://httpstatuses.com/401');
  }
}

/**
 * @description 403 Forbidden error.
 * @param {string} message - The error message.
 */
class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden.') {
    super(message, 403, 'https://httpstatuses.com/403');
  }
}

/**
 * @description 409 Conflict error, specifically for race conditions.
 * @param {string} message - The error message.
 */
class ConflictError extends ApiError {
  constructor(message = 'Resource conflict. Another driver may have claimed this order.') {
    super(message, 409, 'https://httpstatuses.com/409');
  }
}

/**
 * @description 400 Bad Request error.
 * @param {string} message - The error message.
 */
class BadRequestError extends ApiError {
  constructor(message = 'Bad request.') {
    super(message, 400, 'https://httpstatuses.com/400');
  }
}

/**
 * @description 429 Too Many Requests error.
 * @param {string} message - The error message.
 */
class TooManyRequestsError extends ApiError {
  constructor(message = 'Too many requests. Please try again later.') {
    super(message, 429, 'https://httpstatuses.com/429');
  }
}

/**
 * @description 500 Internal Server Error.
 * @param {string} message - The error message.
 */
class InternalServerError extends ApiError {
  constructor(message = 'An unexpected error occurred.') {
    super(message, 500, 'https://httpstatuses.com/500');
  }
}

module.exports = {
  ApiError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  BadRequestError,
  TooManyRequestsError,
  InternalServerError
};
