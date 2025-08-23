const Cafe = require("../models/cafe");

// Sign in for cafes
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const cafe = await Cafe.findOne({ email });
    if (!cafe || !(await cafe.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Sign in successful", cafe });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create internal order
exports.createOrder = async (req, res) => {
  const { items, customerId } = req.body;
  try {
    const newOrder = await Order.create({ items, customerId, status: "pending" });
    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Track delivery progress
exports.trackDelivery = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order found", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.applyCafe = async (req, res) => {
  const { userId, name, area, address, geo } = req.body;
  try {
    const cafe = new Cafe({ userId, name, area, address, geo });
    await cafe.save();
    res.status(201).json({ message: "Cafe application submitted", cafe });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCafes = async (req, res) => {
  const { area } = req.query;
  const filter = area ? { area } : {};
  try {
    const cafes = await Cafe.find({ ...filter, status: "approved" });
    res.json({ cafes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id);
    if (!cafe) return res.status(404).json({ error: "Cafe not found" });
    res.json({ menu: cafe.menu });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id);
    if (!cafe) return res.status(404).json({ error: "Cafe not found" });
    cafe.menu.push(req.body);
    await cafe.save();
    res.status(201).json({ message: "Menu item added", menu: cafe.menu });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
