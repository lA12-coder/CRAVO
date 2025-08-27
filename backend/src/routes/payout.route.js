// src/routes/payout.route.js
const express = require('express');
const { authMiddleware, authorizeRole } = require('../middlewares/auth');
const payoutController = require('../controllers/payout.controller');

const router = express.Router();

/**
 * @api {get} /api/v1/payouts/me Get my payout history
 * @apiDescription Get the payout history for the currently authenticated user (cafe or driver).
 * @apiGroup Payouts
 * @apiHeader {String} Authorization User's ID token.
 * @apiSuccess {Object[]} payouts List of payout objects.
 */
router.get('/me', authMiddleware, authorizeRole(['cafe', 'driver']), payoutController.getMyPayouts);

/**
 * @api {get} /api/v1/payouts/:payoutId Get a single payout
 * @apiDescription Get a single payout by its ID. Accessible by admin or the recipient.
 * @apiGroup Payouts
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} payoutId The ID of the payout.
 * @apiSuccess {Object} payout The payout object.
 */
router.get('/:payoutId', authMiddleware, payoutController.getPayoutById);

/**
 * @api {post} /api/v1/payouts/request Request a manual payout
 * @apiDescription Request a manual payout.
 * @apiGroup Payouts
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {Number} amount The amount to be paid out.
 * @apiSuccess {Object} payout The created payout request object.
 */
router.post('/request', authMiddleware, authorizeRole(['cafe', 'driver']), payoutController.requestPayout);

/**
 * @api {put} /api/v1/payouts/:payoutId/complete Complete a payout
 * @apiDescription Mark a payout as complete. Accessible only by admins.
 * @apiGroup Payouts
 * @apiHeader {String} Authorization User's ID token.
 * @apiParam {String} payoutId The ID of the payout to complete.
 * @apiSuccess {Object} payout The updated payout object.
 */
router.put('/:payoutId/complete', authMiddleware, authorizeRole(['admin']), payoutController.completePayout);

module.exports = router;
