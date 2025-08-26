// src/models/cafe.model.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const CafeSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
    unique: true,
    immutable: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  menu: {
    type: String,
    ref: 'Menu'
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'busy'],
    default: 'open'
  },
  payoutDetails: {
    bankName: {
      type: String,
      required: true,
      trim: true
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true
    },
    accountHolder: {
      type: String,
      required: true,
      trim: true
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
CafeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create a geospatial index for efficient location-based queries
CafeSchema.index({ location: '2dsphere' });

/**
 * @typedef Cafe
 */
const Cafe = mongoose.model('Cafe', CafeSchema);

module.exports = Cafe;
