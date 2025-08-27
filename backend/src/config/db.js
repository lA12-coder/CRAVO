// src/config/db.js
const mongoose = require('mongoose');
const config = require('./env');
const { logger } = require('../utils/logger');

/**
 * @description Connect to MongoDB.
 * @async
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`MongoDB connection error: ${err.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
