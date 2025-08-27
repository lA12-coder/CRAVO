// src/models/driver.model.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const DriverSchema = new mongoose.Schema({
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
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  vehicleType: {
    type: String,
    enum: ['motorcycle', 'car', 'bicycle'],
    required: true
  },
  vehiclePlate: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'on_delivery'],
    default: 'offline'
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
DriverSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create a geospatial index for efficient location-based queries
DriverSchema.index({ location: '2dsphere' });

/**
 * @typedef Driver
 */
const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;
