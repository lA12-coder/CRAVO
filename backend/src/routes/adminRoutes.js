const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin routes
router.get("/customers", adminController.getAllCustomers);
router.get("/delivery-personnel", adminController.getAllDeliveryPersonnel);
router.get("/cafes", adminController.getAllCafes);
router.get("/orders", adminController.getAllOrders);
router.post("/dispute", adminController.handleDispute);

module.exports = router;