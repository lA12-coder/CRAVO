// src/models/order.model.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const OrderSchema = new mongoose.Schema({
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
  cafeId: {
    type: String,
    ref: 'Cafe',
    required: true,
    immutable: true
  },
  driverId: {
    type: String,
    ref: 'Driver',
    default: null
  },
  items: [{
    _id: {
      type: String,
      default: uuidv4
    },
    menuItemId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryFee: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['chapa', 'telebirr', 'cash'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'assigned', 'in_transit', 'delivered', 'canceled'],
    default: 'pending'
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
  estimatedDeliveryTime: {
    type: Date
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
OrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create geospatial index for the location field
OrderSchema.index({ location: '2dsphere' });

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
