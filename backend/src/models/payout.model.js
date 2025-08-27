// src/models/payout.model.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const PayoutSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
    immutable: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['chapa', 'telebirr', 'bank_transfer'],
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
});

/**
 * @typedef Payout
 */
const Payout = mongoose.model('Payout', PayoutSchema);

module.exports = Payout;
