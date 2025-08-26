// src/routes/user.route.js
const express = require('express');
const { authMiddleware, authorizeRole } = require('../middlewares/auth');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

/**
 * @api {post} /api/v1/auth/register Register a new user
 * @apiDescription Register a new user with a customer role.
 * @apiGroup Auth
 * @apiParam {String} firebaseId User's Firebase ID.
 * @apiParam {String} firstName User's first name.
 * @apiParam {String} lastName User's last name.
 * @apiParam {String} email User's email.
 * @apiParam {String} phone User's phone number.
 * @apiSuccess {Object} user User object.
 */
router.post('/auth/register', authController.register);

/**
 * @api {get} /api/v1/users/me Get current user profile
 * @apiDescription Get the profile of the currently authenticated user.
 * @apiGroup Users
 * @apiHeader {String} Authorization User's ID token.
 * @apiSuccess {Object} user User object.
 */
router.get('/users/me', authMiddleware, userController.getCurrentUser);

/**
 * @api {put} /api/v1/users/:userId Update user profile
 * @apiDescription Update a user's profile. Accessible only by admins or the user themselves.
 * @apiGroup Users
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} userId The ID of the user to update.
 * @apiParam {String} [firstName] User's first name.
 * @apiParam {String} [lastName] User's last name.
 * @apiParam {String} [email] User's email.
 * @apiParam {String} [phone] User's phone number.
 * @apiSuccess {Object} user The updated user object.
 */
router.put('/users/:userId', authMiddleware, authorizeRole(['admin', 'customer', 'driver', 'cafe']), userController.updateUser);

/**
 * @api {get} /api/v1/users/:userId Get user by ID
 * @apiDescription Get a user's profile by their ID. Accessible by admins and the user themselves.
 * @apiGroup Users
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} userId The ID of the user to get.
 * @apiSuccess {Object} user The user object.
 */
router.get('/users/:userId', authMiddleware, authorizeRole(['admin', 'customer', 'driver', 'cafe']), userController.getUserById);

module.exports = router;
