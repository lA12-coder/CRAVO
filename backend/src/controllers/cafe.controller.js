// src/controllers/cafe.controller.js
const { validationResult } = require('express-validator');
const Cafe = require('../models/cafe.model');
const User = require('../models/user.model');
const { NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError } = require('../utils/errors');
const { logger } = require('../utils/logger');
const { geolib } = require('geolib');

/**
 * @description Register a new cafe and link it to an existing user with a 'cafe' role.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.registerCafe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError('Validation failed.', errors.array()));
  }

  const { name, description, address, location, payoutDetails } = req.body;
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    if (user.role !== 'cafe') {
      return next(new ForbiddenError('User is not authorized to register a cafe.'));
    }

    // Check if a cafe is already registered for this user
    const existingCafe = await Cafe.findOne({ userId: user._id });
    if (existingCafe) {
      return next(new BadRequestError('A cafe is already registered for this user.'));
    }

    const newCafe = new Cafe({
      userId: user._id,
      name,
      description,
      address,
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      },
      payoutDetails
    });

    await newCafe.save();

    res.status(201).json({ cafe: newCafe });
  } catch (error) {
    logger.error(`Error registering cafe: ${error.message}`);
    next(new InternalServerError('An error occurred during cafe registration.'));
  }
};

/**
 * @description Get a list of all cafes.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getAllCafes = async (req, res, next) => {
  try {
    const cafes = await Cafe.find({});
    res.status(200).json({ cafes });
  } catch (error) {
    logger.error(`Error getting all cafes: ${error.message}`);
    next(new InternalServerError('An error occurred while fetching cafes.'));
  }
};

/**
 * @description Get a single cafe by its ID.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getCafeById = async (req, res, next) => {
  try {
    const { cafeId } = req.params;
    const cafe = await Cafe.findById(cafeId);

    if (!cafe) {
      return next(new NotFoundError('Cafe not found.'));
    }

    res.status(200).json({ cafe });
  } catch (error) {
    logger.error(`Error getting cafe by ID: ${error.message}`);
    next(new InternalServerError('An error occurred while fetching cafe data.'));
  }
};

/**
 * @description Update a cafe's details.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.updateCafe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError('Validation failed.', errors.array()));
  }

  try {
    const { cafeId } = req.params;
    const updates = req.body;
    const userId = req.user.uid;

    const user = await User.findOne({ firebaseId: userId });
    const cafe = await Cafe.findById(cafeId);

    if (!cafe) {
      return next(new NotFoundError('Cafe not found.'));
    }

    // Check if the authenticated user is the owner of the cafe
    if (user._id.toString() !== cafe.userId.toString()) {
      return next(new UnauthorizedError('You are not authorized to update this cafe.'));
    }

    Object.assign(cafe, updates);
    await cafe.save();

    res.status(200).json({ cafe });
  } catch (error) {
    logger.error(`Error updating cafe: ${error.message}`);
    next(new InternalServerError('An error occurred while updating cafe data.'));
  }
};

/**
 * @description Delete a cafe.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.deleteCafe = async (req, res, next) => {
  try {
    const { cafeId } = req.params;
    const cafe = await Cafe.findByIdAndDelete(cafeId);

    if (!cafe) {
      return next(new NotFoundError('Cafe not found.'));
    }

    res.status(200).json({ message: 'Cafe deleted successfully.' });
  } catch (error) {
    logger.error(`Error deleting cafe: ${error.message}`);
    next(new InternalServerError('An error occurred while deleting the cafe.'));
  }
};
