// src/middlewares/error.js
const { logger } = require("../utils/logger");
const { CustomError } = require("../utils/errors");

/**
 * @description General error-handling middleware.
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // Handle custom errors
  if (err instanceof CustomError) {
    logger.error(`[${err.name}] ${err.message}`, err.details);
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    logger.error(`[ValidationError] ${message}`);
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Handle generic server errors
  logger.error(`[Internal Server Error] ${err.message}`, err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;
