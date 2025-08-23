const User = require("../models/user");

exports.signUp = async (req, res) => {
  // Assume Firebase registration is done on frontend, just save user to DB
  const { uid, phone, email, name } = req.body;
  try {
    const user = new User({ uid, phone, email, name, role: "customer", status: "active" });
    await user.save();
    res.status(201).json({ message: "Customer registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  // Login is handled by Firebase, just return user profile
  const { uid } = req.body;
  try {
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.browseMenu = async (req, res) => {
  // TODO: Implement menu fetch from cafes
  res.json({ menu: [] });
};

exports.addToCart = async (req, res) => {
  // TODO: Implement cart logic
  res.json({ message: "Added to cart" });
};

exports.checkout = async (req, res) => {
  // TODO: Implement payment intent logic
  res.json({ message: "Checkout initiated" });
};

exports.viewOrderHistory = async (req, res) => {
  // TODO: Implement order history fetch
  res.json({ orders: [] });
};
