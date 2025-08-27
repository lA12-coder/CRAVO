// src/routes/order.route.js
const express = require('express');
const { authMiddleware, authorizeRole } = require('../middlewares/auth');
const orderController = require('../controllers/order.controller');

const router = express.Router();

/**
 * @api {post} /api/v1/orders Create a new order
 * @apiDescription Create a new food order from a customer.
 * @apiGroup Orders
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} cafeId The ID of the cafe the order is for.
 * @apiParam {Object[]} items The list of food items in the order.
 * @apiParam {String} items.menuItemId The ID of the menu item.
 * @apiParam {Number} items.quantity The quantity of the item.
 * @apiParam {String} paymentMethod The payment method (e.g., 'chapa', 'telebirr', 'cash').
 * @apiSuccess {Object} order The newly created order object.
 */
router.post('/', authMiddleware, authorizeRole(['customer']), orderController.createOrder);

/**
 * @api {get} /api/v1/orders Get orders for a user or admin
 * @apiDescription Get a list of orders. Accessible by customers, cafes, drivers, and admins.
 * @apiGroup Orders
 * @apiHeader {String} Authorization User's ID token.
 * @apiSuccess {Object[]} orders List of order objects.
 */
router.get('/', authMiddleware, orderController.getOrders);

/**
 * @api {get} /api/v1/orders/:orderId Get order details
 * @apiDescription Get a single order's details by its ID.
 * @apiGroup Orders
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} orderId The ID of the order.
 * @apiSuccess {Object} order The order object.
 */
router.get('/:orderId', authMiddleware, orderController.getOrderById);

/**
 * @api {put} /api/v1/orders/:orderId/accept Accept an order
 * @apiDescription Cafe accepts a pending order.
 * @apiGroup Orders
 * @apiHeader {String} Authorization Cafe's ID token.
 * @apiParam {String} orderId The ID of the order.
 * @apiSuccess {Object} order The updated order object.
 */
router.put('/:orderId/accept', authMiddleware, authorizeRole(['cafe']), orderController.acceptOrder);

/**
 * @api {put} /api/v1/orders/:orderId/assign Assign an order to a driver
 * @apiDescription Cafe assigns an accepted order to a driver.
 * @apiGroup Orders
 * @apiHeader {String} Authorization Cafe's ID token.
 * @apiParam {String} orderId The ID of the order.
 * @apiParam {String} driverId The ID of the driver to assign.
 * @apiSuccess {Object} order The updated order object.
 */
router.put('/:orderId/assign', authMiddleware, authorizeRole(['cafe']), orderController.assignDriverToOrder);

/**
 * @api {put} /api/v1/orders/:orderId/pickup Driver picks up an order
 * @apiDescription Driver changes order status to 'in_transit'.
 * @apiGroup Orders
 * @apiHeader {String} Authorization Driver's ID token.
 * @apiParam {String} orderId The ID of the order.
 * @apiSuccess {Object} order The updated order object.
 */
router.put('/:orderId/pickup', authMiddleware, authorizeRole(['driver']), orderController.pickupOrder);

/**
 * @api {put} /api/v1/orders/:orderId/deliver Driver delivers an order
 * @apiDescription Driver changes order status to 'delivered'.
 * @apiGroup Orders
 * @apiHeader {String} Authorization Driver's ID token.
 * @apiParam {String} orderId The ID of the order.
 * @apiSuccess {Object} order The updated order object.
 */
router.put('/:orderId/deliver', authMiddleware, authorizeRole(['driver']), orderController.deliverOrder);

/**
 * @api {put} /api/v1/orders/:orderId/cancel Cancel an order
 * @apiDescription Cancel an order. Accessible by customer or admin.
 * @apiGroup Orders
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} orderId The ID of the order.
 * @apiSuccess {Object} order The updated order object.
 */
router.put('/:orderId/cancel', authMiddleware, orderController.cancelOrder);

module.exports = router;
