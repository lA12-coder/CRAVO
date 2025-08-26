// src/models/menu.model.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MenuSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  cafeId: {
    type: String,
    ref: 'Cafe',
    required: true,
    unique: true,
    immutable: true
  },
  categories: [{
    _id: {
      type: String,
      default: uuidv4
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    items: [{
      _id: {
        type: String,
        default: uuidv4
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
      price: {
        type: Number,
        required: true,
        min: 0
      },
      image: {
        type: String,
        trim: true
      },
      isAvailable: {
        type: Boolean,
        default: true
      }
    }]
  }],
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
MenuSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

/**
 * @typedef Menu
 */
const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
