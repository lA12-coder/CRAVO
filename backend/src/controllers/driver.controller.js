// src/controllers/driver.controller.js
const { validationResult } = require('express-validator');
const Driver = require('../models/driver.model');
const User = require('../models/user.model');
const { NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError } = require('../utils/errors');
const { logger } = require('../utils/logger');
const geolib = require('geolib');

/**
 * @description Register a new driver and link it to an existing user with a 'driver' role.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.registerDriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError('Validation failed.', errors.array()));
  }

  const { licenseNumber, vehicleType, vehiclePlate, location } = req.body;
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    if (user.role !== 'driver') {
      return next(new ForbiddenError('User is not authorized to register as a driver.'));
    }

    // Check if a driver profile already exists for this user
    const existingDriver = await Driver.findOne({ userId: user._id });
    if (existingDriver) {
      return next(new BadRequestError('A driver profile is already registered for this user.'));
    }

    const newDriver = new Driver({
      userId: user._id,
      licenseNumber,
      vehicleType,
      vehiclePlate,
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      }
    });

    await newDriver.save();

    res.status(201).json({ driver: newDriver });
  } catch (error) {
    logger.error(`Error registering driver: ${error.message}`);
    next(new InternalServerError('An error occurred during driver registration.'));
  }
};

/**
 * @description Get a list of all drivers.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getAllDrivers = async (req, res, next) => {
  try {
    const drivers = await Driver.find({});
    res.status(200).json({ drivers });
  } catch (error) {
    logger.error(`Error getting all drivers: ${error.message}`);
    next(new InternalServerError('An error occurred while fetching drivers.'));
  }
};

/**
 * @description Find available drivers near a specific location.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.findNearbyDrivers = async (req, res, next) => {
  const { lat, lng, radius = 5 } = req.query; // Default radius is 5 km

  if (!lat || !lng) {
    return next(new BadRequestError('Latitude and longitude are required.'));
  }

  try {
    const drivers = await Driver.find({
      status: 'online',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseFloat(radius) * 1000 // Convert km to meters
        }
      }
    });

    res.status(200).json({ drivers });
  } catch (error) {
    logger.error(`Error finding nearby drivers: ${error.message}`);
    next(new InternalServerError('An error occurred while searching for drivers.'));
  }
};

/**
 * @description Get the profile of the currently authenticated driver.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getCurrentDriver = async (req, res, next) => {
  try {
    const user = await User.findOne({ firebaseId: req.user.uid });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    const driver = await Driver.findOne({ userId: user._id });
    if (!driver) {
      return next(new NotFoundError('Driver profile not found.'));
    }

    res.status(200).json({ driver });
  } catch (error) {
    logger.error(`Error getting current driver: ${error.message}`);
    next(new InternalServerError('An error occurred while fetching driver data.'));
  }
};

/**
 * @description Update the location of the currently authenticated driver.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.updateDriverLocation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError('Validation failed.', errors.array()));
  }

  const { location } = req.body;
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    const driver = await Driver.findOneAndUpdate(
      { userId: user._id },
      {
        location: {
          type: 'Point',
          coordinates: [location.lng, location.lat]
        }
      },
      { new: true, runValidators: true }
    );

    if (!driver) {
      return next(new NotFoundError('Driver profile not found.'));
    }

    res.status(200).json({ driver });
  } catch (error) {
    logger.error(`Error updating driver location: ${error.message}`);
    next(new InternalServerError('An error occurred while updating driver location.'));
  }
};

/**
 * @description Update the status of the currently authenticated driver.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.updateDriverStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError('Validation failed.', errors.array()));
  }

  const { status } = req.body;
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    const driver = await Driver.findOneAndUpdate(
      { userId: user._id },
      { status },
      { new: true, runValidators: true }
    );

    if (!driver) {
      return next(new NotFoundError('Driver profile not found.'));
    }

    res.status(200).json({ driver });
  } catch (error) {
    logger.error(`Error updating driver status: ${error.message}`);
    next(new InternalServerError('An error occurred while updating driver status.'));
  }
};
