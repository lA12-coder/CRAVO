const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  vehicleType: String,
  licenseId: String,
  earnings: {
    available: { type: Number, default: 0 },
    pending: { type: Number, default: 0 },
    lifetime: { type: Number, default: 0 },
  },
  activeOrderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  approvedAt: Date,
  weeklyPayoutPreference: { type: String, enum: ["chapa", "telebirr"], default: "chapa" },
  minPayoutETB: { type: Number, default: 500 },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
});

module.exports = mongoose.model("DeliveryPerson", driverSchema);
