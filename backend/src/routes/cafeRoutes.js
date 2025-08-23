const express = require("express");
const { applyCafe, getCafes, getMenu, addMenuItem } = require("../controllers/cafeController");
const requireAuth = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const router = express.Router();

// Route for applying to open a cafe
router.post("/apply", requireAuth, requireRole(["cafe"]), applyCafe);

// Route for getting all cafes
router.get("/", getCafes);

// Route for getting cafe menu
router.get("/:id/menu", getMenu);

// Route for adding an item to the cafe menu
router.post("/:id/menu", requireAuth, requireRole(["cafe", "admin"]), addMenuItem);

module.exports = router;
