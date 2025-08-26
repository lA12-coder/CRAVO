// src/controllers/order.controller.js
const { validationResult } = require('express-validator');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Cafe = require('../models/cafe.model');
const Menu = require('../models/menu.model');
const { NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError, ConflictError } = require('../utils/errors');
const { logger } = require('../utils/logger');
const { Types } = require('mongoose');

/**
 * @description Create a new order.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.createOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequestError('Validation failed.', errors.array()));
  }

  const { cafeId, items, paymentMethod } = req.body;
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    const cafe = await Cafe.findById(cafeId);
    if (!cafe) {
      return next(new NotFoundError('Cafe not found.'));
    }

    const menu = await Menu.findOne({ cafeId: cafe._id });
    if (!menu) {
      return next(new NotFoundError('Menu not found for this cafe.'));
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = menu.categories.flatMap(cat => cat.items).find(i => i._id.toString() === item.menuItemId);
      if (!menuItem) {
        return next(new BadRequestError(`Menu item with ID ${item.menuItemId} not found.`));
      }

      if (!menuItem.isAvailable) {
        return next(new BadRequestError(`Menu item ${menuItem.name} is currently unavailable.`));
      }

      const itemTotal = menuItem.price * item.quantity;
      totalPrice += itemTotal;
      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        quantity: item.quantity,
        price: menuItem.price,
        total: itemTotal
      });
    }

    // TODO: Calculate delivery fee based on distance
    const deliveryFee = 50;
    const finalPrice = totalPrice + deliveryFee;

    const newOrder = new Order({
      userId: user._id,
      cafeId: cafe._id,
      items: orderItems,
      totalPrice: finalPrice,
      deliveryFee,
      paymentMethod,
      location: user.location // Use customer's location
    });

    await newOrder.save();

    res.status(201).json({ order: newOrder });
  } catch (error) {
    logger.error(`Error creating order: ${error.message}`);
    next(new InternalServerError('An error occurred while creating the order.'));
  }
};

/**
 * @description Get orders for a user or admin.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getOrders = async (req, res, next) => {
  const userId = req.user.uid;
  const userRole = req.user.role;

  try {
    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    let query = {};
    if (userRole === 'customer') {
      query.userId = user._id;
    } else if (userRole === 'cafe') {
      const cafe = await Cafe.findOne({ userId: user._id });
      if (!cafe) {
        return next(new NotFoundError('Cafe profile not found.'));
      }
      query.cafeId = cafe._id;
    } else if (userRole === 'driver') {
      const driver = await Driver.findOne({ userId: user._id });
      if (!driver) {
        return next(new NotFoundError('Driver profile not found.'));
      }
      query.driverId = driver._id;
    } else if (userRole === 'admin') {
      // Admin can see all orders, no special query needed
    }

    const orders = await Order.find(query).populate('userId cafeId driverId');
    res.status(200).json({ orders });
  } catch (error) {
    logger.error(`Error getting orders: ${error.message}`);
    next(new InternalServerError('An error occurred while fetching orders.'));
  }
};

/**
 * @description Get a single order's details by its ID.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.getOrderById = async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.user.uid;
  const userRole = req.user.role;

  try {
    const order = await Order.findById(orderId).populate('userId cafeId driverId');
    if (!order) {
      return next(new NotFoundError('Order not found.'));
    }

    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
      return next(new NotFoundError('User not found.'));
    }

    // Check if the user is authorized to view this order
    let isAuthorized = false;
    if (userRole === 'admin') {
      isAuthorized = true;
    } else if (userRole === 'customer' && order.userId.toString() === user._id.toString()) {
      isAuthorized = true;
    } else if (userRole === 'cafe') {
      const cafe = await Cafe.findOne({ userId: user._id });
      if (cafe && order.cafeId.toString() === cafe._id.toString()) {
        isAuthorized = true;
      }
    } else if (userRole === 'driver') {
      const driver = await Driver.findOne({ userId: user._id });
      if (driver && order.driverId && order.driverId.toString() === driver._id.toString()) {
        isAuthorized = true;
      }
    }

    if (!isAuthorized) {
      return next(new UnauthorizedError('You are not authorized to view this order.'));
    }

    res.status(200).json({ order });
  } catch (error) {
    logger.error(`Error getting order by ID: ${error.message}`);
    next(new InternalServerError('An error occurred while fetching order data.'));
  }
};

/**
 * @description Cafe accepts a pending order.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.acceptOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    const cafe = await Cafe.findOne({ userId: user._id });

    if (!cafe) {
      return next(new ForbiddenError('You must be a cafe owner to perform this action.'));
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new NotFoundError('Order not found.'));
    }

    if (order.cafeId.toString() !== cafe._id.toString()) {
      return next(new UnauthorizedError('You are not authorized to accept this order.'));
    }

    if (order.status !== 'pending') {
      return next(new ConflictError(`Cannot accept an order with status: ${order.status}`));
    }

    order.status = 'accepted';
    await order.save();

    res.status(200).json({ order });
  } catch (error) {
    logger.error(`Error accepting order: ${error.message}`);
    next(new InternalServerError('An error occurred while accepting the order.'));
  }
};

/**
 * @description Cafe assigns an accepted order to a driver.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.assignDriverToOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { driverId } = req.body;
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    const cafe = await Cafe.findOne({ userId: user._id });

    if (!cafe) {
      return next(new ForbiddenError('You must be a cafe owner to perform this action.'));
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return next(new NotFoundError('Order not found.'));
    }

    if (order.cafeId.toString() !== cafe._id.toString()) {
      return next(new UnauthorizedError('You are not authorized to assign a driver to this order.'));
    }

    if (order.status !== 'accepted') {
      return next(new ConflictError(`Cannot assign a driver to an order with status: ${order.status}`));
    }
    
    const driver = await Driver.findById(driverId);
    if (!driver) {
        return next(new NotFoundError('Driver not found.'));
    }

    // Check if the driver is available
    if (driver.status !== 'online') {
      return next(new ConflictError(`Driver is currently ${driver.status} and cannot be assigned.`));
    }

    order.driverId = driver._id;
    order.status = 'assigned';
    await order.save();

    // TODO: Send a notification to the driver
    // TODO: Update driver's status to 'on_delivery'
    // For now, let's keep the driver status change in the pickup endpoint
    
    res.status(200).json({ order });
  } catch (error) {
    logger.error(`Error assigning driver to order: ${error.message}`);
    next(new InternalServerError('An error occurred while assigning the driver.'));
  }
};

/**
 * @description Driver picks up an order.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.pickupOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    const driver = await Driver.findOne({ userId: user._id });

    if (!driver) {
      return next(new ForbiddenError('You must be a driver to perform this action.'));
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return next(new NotFoundError('Order not found.'));
    }

    if (order.driverId && order.driverId.toString() !== driver._id.toString()) {
      return next(new UnauthorizedError('You are not the assigned driver for this order.'));
    }
    
    if (order.status !== 'assigned') {
      return next(new ConflictError(`Cannot pick up an order with status: ${order.status}`));
    }

    order.status = 'in_transit';
    driver.status = 'on_delivery';
    
    // Using a transaction to ensure both updates succeed or fail together
    const session = await Order.startSession();
    session.startTransaction();
    
    try {
        await order.save({ session });
        await driver.save({ session });
        await session.commitTransaction();
    } catch (transactionError) {
        await session.abortTransaction();
        throw transactionError;
    } finally {
        session.endSession();
    }

    res.status(200).json({ order });
  } catch (error) {
    logger.error(`Error picking up order: ${error.message}`);
    next(new InternalServerError('An error occurred while picking up the order.'));
  }
};

/**
 * @description Driver delivers an order.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.deliverOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.user.uid;

  try {
    const user = await User.findOne({ firebaseId: userId });
    const driver = await Driver.findOne({ userId: user._id });

    if (!driver) {
      return next(new ForbiddenError('You must be a driver to perform this action.'));
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return next(new NotFoundError('Order not found.'));
    }

    if (order.driverId && order.driverId.toString() !== driver._id.toString()) {
      return next(new UnauthorizedError('You are not the assigned driver for this order.'));
    }
    
    if (order.status !== 'in_transit') {
      return next(new ConflictError(`Cannot deliver an order with status: ${order.status}`));
    }

    order.status = 'delivered';
    driver.status = 'online';

    // Using a transaction to ensure both updates succeed or fail together
    const session = await Order.startSession();
    session.startTransaction();
    
    try {
        await order.save({ session });
        await driver.save({ session });
        await session.commitTransaction();
    } catch (transactionError) {
        await session.abortTransaction();
        throw transactionError;
    } finally {
        session.endSession();
    }
    
    // TODO: Initiate a payout for the cafe and driver
    
    res.status(200).json({ order });
  } catch (error) {
    logger.error(`Error delivering order: ${error.message}`);
    next(new InternalServerError('An error occurred while delivering the order.'));
  }
};

/**
 * @description Cancel an order.
 * @async
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
exports.cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.user.uid;
  const userRole = req.user.role;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return next(new NotFoundError('Order not found.'));
    }
    
    // Only 'pending' or 'accepted' orders can be canceled
    if (order.status !== 'pending' && order.status !== 'accepted') {
      return next(new ConflictError(`Cannot cancel an order with status: ${order.status}`));
    }
    
    const user = await User.findOne({ firebaseId: userId });
    if (!user) {
        return next(new NotFoundError('User not found.'));
    }

    // Admins can cancel any order, a customer can only cancel their own order
    if (userRole !== 'admin' && order.userId.toString() !== user._id.toString()) {
      return next(new UnauthorizedError('You are not authorized to cancel this order.'));
    }

    order.status = 'canceled';
    await order.save();
    
    res.status(200).json({ order });
  } catch (error) {
    logger.error(`Error canceling order: ${error.message}`);
    next(new InternalServerError('An error occurred while canceling the order.'));
  }
};
