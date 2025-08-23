const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  // Validate input, calculate fees, create order
  const { cafeId, items, addresses, pay } = req.body;
  try {
    // Calculate totals (simplified)
    const foodTotalETB = items.reduce((sum, item) => sum + item.subtotalETB, 0);
    const deliveryETB = 50; // TODO: Calculate based on geo
    const platformFeeETB = 10;
    const paymentFeeETB = 5;
    const totalETB = foodTotalETB + deliveryETB + platformFeeETB + paymentFeeETB;

    const order = new Order({
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      customerId: req.user.uid,
      cafeId,
      items,
      fees: { deliveryETB, platformFeeETB, paymentFeeETB, totalETB, foodTotalETB },
      pay,
      addresses,
      status: "WaitingForDriver",
      timestamps: { placedAt: new Date() },
    });
    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.uid });
    res.json({ orders });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    order.customerConfirmation = { confirmed: true, at: new Date() };
    order.status = "Completed";
    await order.save();
    res.json({ message: "Order confirmed", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.disputeOrder = async (req, res) => {
  const { reason, notes } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    order.dispute = { open: true, reason, notes, at: new Date() };
    order.status = "Disputed";
    await order.save();
    res.json({ message: "Order disputed", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
