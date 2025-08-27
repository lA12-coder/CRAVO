// src/routes/cafe.route.js
const express = require('express');
const { authMiddleware, authorizeRole } = require('../middlewares/auth');
const cafeController = require('../controllers/cafe.controller');

const router = express.Router();

/**
 * @api {post} /api/v1/cafes Register a new cafe
 * @apiDescription Register a new cafe and link it to an existing user with a 'cafe' role.
 * @apiGroup Cafes
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} name Cafe's name.
 * @apiParam {String} description Cafe's description.
 * @apiParam {String} address Cafe's address.
 * @apiParam {Object} location Cafe's location (latitude and longitude).
 * @apiParam {Number} location.lat Latitude.
 * @apiParam {Number} location.lng Longitude.
 * @apiParam {Object} payoutDetails Bank account details for payouts.
 * @apiParam {String} payoutDetails.bankName Bank name.
 * @apiParam {String} payoutDetails.accountNumber Account number.
 * @apiParam {String} payoutDetails.accountHolder Account holder's name.
 * @apiSuccess {Object} cafe The newly created cafe object.
 */
router.post('/', authMiddleware, authorizeRole(['cafe']), cafeController.registerCafe);

/**
 * @api {get} /api/v1/cafes Get all cafes
 * @apiDescription Retrieve a list of all cafes.
 * @apiGroup Cafes
 * @apiHeader {String} Authorization User's ID token.
 * @apiSuccess {Object[]} cafes List of cafe objects.
 */
router.get('/', authMiddleware, cafeController.getAllCafes);

/**
 * @api {get} /api/v1/cafes/:cafeId Get cafe by ID
 * @apiDescription Get a single cafe's details by its ID.
 * @apiGroup Cafes
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} cafeId The ID of the cafe.
 * @apiSuccess {Object} cafe The cafe object.
 */
router.get('/:cafeId', authMiddleware, cafeController.getCafeById);

/**
 * @api {put} /api/v1/cafes/:cafeId Update cafe details
 * @apiDescription Update a cafe's details. Only accessible by the cafe owner.
 * @apiGroup Cafes
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} cafeId The ID of the cafe to update.
 * @apiSuccess {Object} cafe The updated cafe object.
 */
router.put('/:cafeId', authMiddleware, authorizeRole(['cafe']), cafeController.updateCafe);

/**
 * @api {delete} /api/v1/cafes/:cafeId Delete a cafe
 * @apiDescription Delete a cafe. Only accessible by admins.
 * @apiGroup Cafes
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} cafeId The ID of the cafe to delete.
 * @apiSuccess {Object} message Success message.
 */
router.delete('/:cafeId', authMiddleware, authorizeRole(['admin']), cafeController.deleteCafe);

module.exports = router;
