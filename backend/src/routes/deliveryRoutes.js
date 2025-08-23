const express = require("express");
const { applyDriver, availableOrders, claimOrder, activeOrder, markFoodBought, markOutForDelivery, markDelivered, earnings } = require("../controllers/deliveryController");
const requireAuth = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const router = express.Router();

// Route for signing in delivery personnel
router.post("/apply", requireAuth, requireRole(["driver"]), applyDriver);

// Route for viewing available orders
router.get("/orders/available", requireAuth, requireRole(["driver"]), availableOrders);

// Route for claiming an order
router.post("/orders/:id/claim", requireAuth, requireRole(["driver"]), claimOrder);

// Route for viewing active order
router.get("/orders/active", requireAuth, requireRole(["driver"]), activeOrder);

// Route for marking food as bought
router.post("/orders/:id/mark-food-bought", requireAuth, requireRole(["driver"]), markFoodBought);

// Route for marking an order out for delivery
router.post("/orders/:id/mark-out-for-delivery", requireAuth, requireRole(["driver"]), markOutForDelivery);

// Route for marking an order as delivered
router.post("/orders/:id/mark-delivered", requireAuth, requireRole(["driver"]), markDelivered);

// Route for viewing earnings
router.get("/earnings", requireAuth, requireRole(["driver"]), earnings);

module.exports = router;
