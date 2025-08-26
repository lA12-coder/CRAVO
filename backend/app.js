// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const admin = require('firebase-admin');

// Import routes
const userRoutes = require('./src/routes/user.route');
const cafeRoutes = require('./src/routes/cafe.route');
const driverRoutes = require('./src/routes/driver.route');
const orderRoutes = require('./src/routes/order.route');
const payoutRoutes = require('./src/routes/payout.route');
const notificationRoutes = require('./src/routes/notification.route');

// Import error handler middleware
const errorHandler = require('./src/middlewares/error');

// Import logger
const { logger } = require('./src/utils/logger');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  logger.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => logger.info('Successfully connected to MongoDB.'))
  .catch(err => {
    logger.error('Could not connect to MongoDB.', err);
    process.exit(1);
  });

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
if (!serviceAccount) {
  logger.error('FIREBASE_SERVICE_ACCOUNT_KEY is not defined in the environment variables.');
  process.exit(1);
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
logger.info('Firebase Admin SDK initialized.');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1/cafes', cafeRoutes);
app.use('/api/v1/drivers', driverRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payouts', payoutRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// Main route
app.get('/', (req, res) => {
  res.send('Welcome to the Food Delivery API!');
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
