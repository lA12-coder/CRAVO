// src/middlewares/auth.js
const admin = require('firebase-admin');
const { UnauthorizedError } = require('../utils/errors');

/**
 * @description Middleware to authenticate requests using Firebase ID tokens.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('No token provided.'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    // Firebase verification failed
    next(new UnauthorizedError('Invalid or expired token.'));
  }
};

/**
 * @description Middleware to restrict access based on user role.
 * @param {string[]} allowedRoles - An array of roles that are permitted to access the route.
 * @returns {import('express').Handler} - An Express middleware function.
 */
const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new UnauthorizedError('User role not found.'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new UnauthorizedError('Access denied.'));
    }
    next();
  };
};

module.exports = { authMiddleware, authorizeRole };
