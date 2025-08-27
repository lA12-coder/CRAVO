// src/controllers/payout.controller.js
const { validationResult } = require('express-validator');
const Payout = require('../models/payout.model');
const User = require('../models/user.model');
const { NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError, ConflictError } = require('../utils/errors');
const { logger } = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

/**
 * @description Get the payout history for the authenticated user (cafe or driver).
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getMyPayouts = async (req, res, next) => {
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    const payouts = await Payout.find({ userId: user._id }).sort({ createdAt: -1 });
    res.status(200).json({ payouts });
  } catch (error) {
    logger.error(`Error getting payouts for user: ${error.message}`);
    next(new InternalServerError('An error occurred while fetching payout history.'));
  }
};

/**
 * @description Get a single payout by its ID.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getPayoutById = async (req, res, next) => {
  const { payoutId } = req.params;
  const userId = req.user.uid;
  const userRole = req.user.role;

  try {
    const user = await User.findOne({ firebaseId: userId });
    const payout = await Payout.findById(payoutId);

    if (!payout) {
      return next(new NotFoundError('Payout not found.'));
    }

    // Admins can view any payout, but users can only view their own
    if (userRole !== 'admin' && payout.userId.toString() !== user._id.toString()) {
      return next(new UnauthorizedError('You are not authorized to view this payout.'));
    }

    res.status(200).json({ payout });
  } catch (error) {
    logger.error(`Error getting payout by ID: ${error.message}`);
    next(new InternalServerError('An error occurred while fetching the payout.'));
  }
};

/**
 * @description Request a manual payout.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.requestPayout = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError('Validation failed.', errors.array()));
  }

  const { amount } = req.body;
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    // TODO: Verify that the user (cafe or driver) has enough balance to request this amount
    // This requires a new model or field on User/Cafe/Driver for managing balance

    const newPayout = new Payout({
      userId: user._id,
      amount,
      status: 'pending',
      paymentMethod: 'bank_transfer', // Assuming manual payouts are via bank transfer for now
      transactionId: uuidv4()
    });

    await newPayout.save();

    res.status(201).json({ payout: newPayout });
  } catch (error) {
    logger.error(`Error requesting payout: ${error.message}`);
    next(new InternalServerError('An error occurred while requesting the payout.'));
  }
};

/**
 * @description Mark a payout as complete.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.completePayout = async (req, res, next) => {
  const { payoutId } = req.params;

  try {
    const payout = await Payout.findById(payoutId);

    if (!payout) {
      return next(new NotFoundError('Payout not found.'));
    }

    if (payout.status !== 'pending') {
      return next(new ConflictError(`Cannot complete a payout with status: ${payout.status}`));
    }

    payout.status = 'paid';
    await payout.save();

    res.status(200).json({ payout });
  } catch (error) {
    logger.error(`Error completing payout: ${error.message}`);
    next(new InternalServerError('An error occurred while completing the payout.'));
  }
};
