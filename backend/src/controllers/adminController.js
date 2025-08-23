const Admin = require("../models/admin"); // Assuming an admin model exists
const Customer = require("../models/customer");
const DeliveryPerson = require("../models/deliveryPerson");
const Cafe = require("../models/cafe");
const Order = require("../models/order");

// Function to manage customers
exports.manageCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving customers", error });
  }
};

// Function to manage delivery personnel
exports.manageDeliveryPersonnel = async (req, res) => {
  try {
    const deliveryPersonnel = await DeliveryPerson.find();
    res.status(200).json(deliveryPersonnel);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving delivery personnel", error });
  }
};

// Function to manage cafes
exports.manageCafes = async (req, res) => {
  try {
    const cafes = await Cafe.find();
    res.status(200).json(cafes);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cafes", error });
  }
};

// Function to view order details
exports.viewOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving order details", error });
  }
};

// Function to handle disputes
exports.handleDispute = async (req, res) => {
  const { orderId, disputeDetails } = req.body;
  try {
    // Logic to handle dispute (e.g., update order status, notify parties)
    res.status(200).json({ message: "Dispute handled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error handling dispute", error });
  }
};