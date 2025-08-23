const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  itemId: String,
  name: String,
  qty: Number,
  unitPriceETB: Number,
  subtotalETB: Number,
});

const orderSchema = new mongoose.Schema({
  code: String,
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cafeId: { type: mongoose.Schema.Types.ObjectId, ref: "Cafe" },
  items: [orderItemSchema],
  fees: {
    deliveryETB: Number,
    platformFeeETB: Number,
    paymentFeeETB: Number,
    totalETB: Number,
    foodTotalETB: Number,
  },
  pay: {
    gateway: String,
    status: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
    txRef: String,
    webhookLog: Array,
  },
  status: {
    type: String,
    enum: ["WaitingForDriver", "Assigned", "FoodBought", "OutForDelivery", "Delivered", "Completed", "Disputed", "Cancelled"],
    default: "WaitingForDriver",
  },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  addresses: {
    customer: {
      text: String,
      geo: {
        type: { type: String, default: "Point" },
        coordinates: [Number], // [lng, lat]
      },
    },
    cafe: {
      text: String,
      geo: {
        type: { type: String, default: "Point" },
        coordinates: [Number],
      },
    },
  },
  timestamps: {
    placedAt: { type: Date, default: Date.now },
    assignedAt: Date,
    boughtAt: Date,
    outAt: Date,
    deliveredAt: Date,
    completedAt: Date,
  },
  receipt: {
    url: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verifiedByCafe: Boolean,
    flagged: Boolean,
  },
  customerConfirmation: {
    confirmed: Boolean,
    at: Date,
  },
  dispute: {
    open: Boolean,
    reason: String,
    notes: String,
    resolved: Boolean,
    resolution: String,
    at: Date,
  },
  ledger: [
    {
      at: Date,
      type: String,
      party: String,
      amountETB: Number,
      ref: String,
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
