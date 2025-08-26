// src/routes/notification.route.js
const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const notificationController = require('../controllers/notification.controller');

const router = express.Router();

/**
 * @api {get} /api/v1/notifications Get all notifications for the authenticated user
 * @apiDescription Get a list of all notifications for the currently logged-in user.
 * @apiGroup Notifications
 * @apiHeader {String} Authorization User's ID token.
 * @apiSuccess {Object[]} notifications List of notification objects.
 */
router.get('/', authMiddleware, notificationController.getNotifications);

/**
 * @api {put} /api/v1/notifications/:notificationId Mark a notification as read
 * @apiDescription Mark a specific notification as read.
 * @apiGroup Notifications
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} notificationId The ID of the notification to mark as read.
 * @apiSuccess {Object} notification The updated notification object.
 */
router.put('/:notificationId/read', authMiddleware, notificationController.markNotificationAsRead);

module.exports = router;
