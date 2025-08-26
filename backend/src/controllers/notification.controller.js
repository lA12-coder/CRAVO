// src/controllers/notification.controller.js
const { validationResult } = require('express-validator');
const Notification = require('../models/notification.model');
const User = require('../models/user.model');
const { NotFoundError, BadRequestError, UnauthorizedError, InternalServerError } = require('../utils/errors');
const { logger } = require('../utils/logger');

/**
 * @description Get all notifications for the authenticated user.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getNotifications = async (req, res, next) => {
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    const notifications = await Notification.find({ userId: user._id }).sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    logger.error(`Error fetching notifications: ${error.message}`);
    next(new InternalServerError('An error occurred while fetching notifications.'));
  }
};

/**
 * @description Mark a specific notification as read.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.markNotificationAsRead = async (req, res, next) => {
  const { notificationId } = req.params;
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return next(new NotFoundError('Notification not found.'));
    }

    if (notification.userId.toString() !== user._id.toString()) {
      return next(new UnauthorizedError('You are not authorized to modify this notification.'));
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ notification });
  } catch (error) {
    logger.error(`Error marking notification as read: ${error.message}`);
    next(new InternalServerError('An error occurred while updating the notification.'));
  }
};
