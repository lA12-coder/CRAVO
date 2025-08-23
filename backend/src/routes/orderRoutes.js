const express = require("express");
const { createOrder, listOrders, getOrder, confirmOrder, disputeOrder } = require("../controllers/orderController");
const requireAuth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", requireAuth, createOrder);
router.get("/", requireAuth, listOrders);
router.get("/:id", requireAuth, getOrder);
router.post("/:id/confirm", requireAuth, confirmOrder);
router.post("/:id/dispute", requireAuth, disputeOrder);

module.exports = router;
