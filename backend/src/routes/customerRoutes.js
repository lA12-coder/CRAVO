const express = require("express");
const { signUp, login, browseMenu, addToCart, checkout, viewOrderHistory } = require("../controllers/customerController");
const requireAuth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/menu", requireAuth, browseMenu);
router.post("/cart/add", requireAuth, addToCart);
router.post("/checkout", requireAuth, checkout);
router.get("/order-history", requireAuth, viewOrderHistory);

module.exports = router;
