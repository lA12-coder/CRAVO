// src/utils/idempotency.js
const { logger } = require('./logger');
const redisClient = require('../config/redis');
const { BadRequestError } = require('./errors');

/**
 * @description Middleware to handle API idempotency.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const idempotencyMiddleware = async (req, res, next) => {
  const idempotencyKey = req.get('Idempotency-Key');

  if (!idempotencyKey) {
    logger.warn('Idempotency-Key header is missing for non-GET request.');
    return next(new BadRequestError('Idempotency-Key header is required.'));
  }

  const redisKey = `idempotency:${idempotencyKey}`;
  const lockTime = 60 * 60; // 1 hour

  try {
    const isLocked = await redisClient.set(redisKey, 'locked', 'EX', lockTime, 'NX');
    if (!isLocked) {
      logger.info(`Idempotency key ${idempotencyKey} already in use. Returning existing result.`);
      // In a real-world scenario, you'd store and retrieve the original response.
      // For this MVP, we simply return a 409 Conflict.
      return res.status(409).json({
        type: 'https://httpstatuses.com/409',
        title: 'Conflict',
        status: 409,
        detail: 'Request with this idempotency key is already being processed.'
      });
    }

    // Capture the original send method to store the response
    const originalSend = res.send;
    res.send = function (body) {
      const responseData = {
        statusCode: res.statusCode,
        headers: res.getHeaders(),
        body: body
      };
      // Store the response for future requests with the same key
      redisClient.set(redisKey, JSON.stringify(responseData), 'EX', lockTime);
      originalSend.apply(this, arguments);
    };

    next();
  } catch (error) {
    logger.error(`Idempotency middleware error: ${error.message}`);
    next(error);
  }
};

module.exports = { idempotencyMiddleware };
