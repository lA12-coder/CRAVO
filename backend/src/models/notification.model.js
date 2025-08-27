// src/models/notification.model.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const NotificationSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['order_status', 'payout', 'general'],
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  payload: {
    type: mongoose.Schema.Types.Mixed // For storing additional data like orderId
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
});

// Create an index for faster lookups by user and read status
NotificationSchema.index({ userId: 1, isRead: 1 });

/**
 * @typedef Notification
 */
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
