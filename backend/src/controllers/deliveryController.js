const DeliveryPerson = require("../models/deliveryPerson");
const Order = require("../models/order");

// Sign in delivery personnel
exports.signIn = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const deliveryPerson = await DeliveryPerson.findOne({ phoneNumber });
    if (!deliveryPerson) {
      return res.status(404).json({ message: "Delivery personnel not found." });
    }
    // Logic for generating token or session can be added here
    res.status(200).json({ message: "Sign in successful.", deliveryPerson });
  } catch (error) {
    res.status(500).json({ message: "Error signing in.", error });
  }
};

// Apply to be a driver
exports.applyDriver = async (req, res) => {
  const { userId, vehicleType, licenseId } = req.body;
  try {
    const driver = new DeliveryPerson({ userId, vehicleType, licenseId });
    await driver.save();
    res.status(201).json({ message: "Driver application submitted", driver });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View available orders
exports.viewAvailableOrders = async (req, res) => {
  try {
    // Only show orders not claimed and waiting for driver
    const orders = await Order.find({ status: "WaitingForDriver", driverId: null }).select("code cafeId fees.deliveryETB timestamps.placedAt addresses.cafe");
    res.json({ orders });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Claim an order
exports.claimOrder = async (req, res) => {
  const driverId = req.user.uid;
  const orderId = req.params.id;
  try {
    const driver = await DeliveryPerson.findOne({ userId: driverId });
    if (!driver || driver.activeOrderId) return res.status(409).json({ error: "Driver already has an active order" });

    const order = await Order.findOneAndUpdate({ _id: orderId, status: "WaitingForDriver", driverId: null }, { $set: { status: "Assigned", driverId: driver._id, "timestamps.assignedAt": new Date() } }, { new: true });
    if (!order) return res.status(409).json({ error: "Order already claimed" });

    driver.activeOrderId = order._id;
    await driver.save();
    res.json({ message: "Order claimed", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// View active order
exports.activeOrder = async (req, res) => {
  try {
    const driver = await DeliveryPerson.findOne({ userId: req.user.uid });
    if (!driver || !driver.activeOrderId) return res.json({ order: null });
    const order = await Order.findById(driver.activeOrderId);
    res.json({ order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mark food as bought
exports.markFoodBought = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    order.status = "FoodBought";
    order.timestamps.boughtAt = new Date();
    await order.save();
    res.json({ message: "Marked as Food Bought", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mark order as out for delivery
exports.markOutForDelivery = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    order.status = "OutForDelivery";
    order.timestamps.outAt = new Date();
    await order.save();
    res.json({ message: "Marked Out For Delivery", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mark order as delivered
exports.markDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    order.status = "Delivered";
    order.timestamps.deliveredAt = new Date();
    await order.save();
    res.json({ message: "Marked Delivered", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get earnings
exports.earnings = async (req, res) => {
  try {
    const driver = await DeliveryPerson.findOne({ userId: req.user.uid });
    if (!driver) return res.status(404).json({ error: "Driver not found" });
    res.json({ earnings: driver.earnings });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
