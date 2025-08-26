// src/controllers/auth.controller.js
const admin = require('firebase-admin');
const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const { BadRequestError, InternalServerError } = require('../utils/errors');
const { logger } = require('../utils/logger');

/**
 * @description Register a new user with a 'customer' role.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError('Validation failed.', errors.array()));
  }

  const { firebaseId, firstName, lastName, email, phone, address } = req.body;

  try {
    // Check if user already exists in our database
    let user = await User.findOne({ firebaseId });
    if (user) {
      return res.status(200).json({ user });
    }

    // Create a new user in our database
    user = new User({
      firebaseId,
      firstName,
      lastName,
      email,
      phone,
      address,
      role: 'customer' // All new registrations are customers by default
    });

    await user.save();

    logger.info(`New user registered: ${user.email}`);
    res.status(201).json({ user });
  } catch (error) {
    logger.error(`Error during user registration: ${error.message}`);
    next(new InternalServerError('An error occurred during registration.'));
  }
};
