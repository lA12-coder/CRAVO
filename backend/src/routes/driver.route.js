// src/routes/driver.route.js
const express = require('express');
const { authMiddleware, authorizeRole } = require('../middlewares/auth');
const driverController = require('../controllers/driver.controller');

const router = express.Router();

/**
 * @api {post} /api/v1/drivers Register a new driver
 * @apiDescription Register a new driver and link it to an existing user with a 'driver' role.
 * @apiGroup Drivers
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} licenseNumber Driver's license number.
 * @apiParam {String} vehicleType Driver's vehicle type.
 * @apiParam {String} vehiclePlate Driver's vehicle plate number.
 * @apiParam {Object} location Driver's initial location (latitude and longitude).
 * @apiParam {Number} location.lat Latitude.
 * @apiParam {Number} location.lng Longitude.
 * @apiSuccess {Object} driver The newly created driver object.
 */
router.post('/', authMiddleware, authorizeRole(['driver']), driverController.registerDriver);

/**
 * @api {get} /api/v1/drivers Get all drivers
 * @apiDescription Retrieve a list of all drivers.
 * @apiGroup Drivers
 * @apiHeader {String} Authorization User's ID token.
 * @apiSuccess {Object[]} drivers List of driver objects.
 */
router.get('/', authMiddleware, authorizeRole(['admin']), driverController.getAllDrivers);

/**
 * @api {get} /api/v1/drivers/search Find nearby drivers
 * @apiDescription Find available drivers near a specific location.
 * @apiGroup Drivers
 * @apiHeader {String} Authorization User's ID token.
 * @apiQuery {Number} lat Latitude of the search origin.
 * @apiQuery {Number} lng Longitude of the search origin.
 * @apiQuery {Number} radius Search radius in kilometers.
 * @apiSuccess {Object[]} drivers List of nearby driver objects.
 */
router.get('/search', authMiddleware, driverController.findNearbyDrivers);

/**
 * @api {get} /api/v1/drivers/me Get current driver profile
 * @apiDescription Get the profile of the currently authenticated driver.
 * @apiGroup Drivers
 * @apiHeader {String} Authorization User's ID token.
 * @apiSuccess {Object} driver Driver object.
 */
router.get('/me', authMiddleware, authorizeRole(['driver']), driverController.getCurrentDriver);

/**
 * @api {put} /api/v1/drivers/me/location Update driver location
 * @apiDescription Update the location of the currently authenticated driver.
 * @apiGroup Drivers
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {Object} location Driver's new location (latitude and longitude).
 * @apiParam {Number} location.lat Latitude.
 * @apiParam {Number} location.lng Longitude.
 * @apiSuccess {Object} driver The updated driver object.
 */
router.put('/me/location', authMiddleware, authorizeRole(['driver']), driverController.updateDriverLocation);

/**
 * @api {put} /api/v1/drivers/me/status Update driver status
 * @apiDescription Update the status of the currently authenticated driver.
 * @apiGroup Drivers
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} status Driver's new status.
 * @apiSuccess {Object} driver The updated driver object.
 */
router.put('/me/status', authMiddleware, authorizeRole(['driver']), driverController.updateDriverStatus);

module.exports = router;
