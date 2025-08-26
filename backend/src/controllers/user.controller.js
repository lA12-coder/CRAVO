// src/controllers/user.controller.js
const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const { NotFoundError, BadRequestError, UnauthorizedError, InternalServerError } = require('../utils/errors');
const { logger } = require('../utils/logger');

/**
 * @description Get the profile of the currently authenticated user.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }
    res.status(200).json({ user });
  } catch (error) {
    logger.error(`Error getting current user: ${error.message}`);
    next(new InternalServerError('An error occurred while fetching user data.'));
  }
};

/**
 * @description Get a user's profile by their ID.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    // Check if the authenticated user is authorized to view this profile
    if (req.user.role !== 'admin' && req.user.uid !== user.firebaseId) {
      return next(new UnauthorizedError('Access denied. You can only view your own profile.'));
    }

    res.status(200).json({ user });
  } catch (error) {
    logger.error(`Error getting user by ID: ${error.message}`);
    next(new InternalServerError('An error occurred while fetching user data.'));
  }
};

/**
 * @description Update a user's profile.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError('Validation failed.', errors.array()));
  }

  try {
    const { userId } = req.params;
    const updates = req.body;

    // Fetch the user to ensure it exists
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    // Check if the authenticated user is authorized to update this profile
    if (req.user.role !== 'admin' && req.user.uid !== user.firebaseId) {
      return next(new UnauthorizedError('Access denied. You can only update your own profile.'));
    }
    
    // Admins can update roles, but regular users cannot
    if (updates.role && req.user.role !== 'admin') {
      delete updates.role;
    }
    
    // Update the user
    Object.assign(user, updates);
    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    next(new InternalServerError('An error occurred while updating user data.'));
  }
};
