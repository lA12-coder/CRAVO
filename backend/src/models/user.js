const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: String, // Firebase UID
  phone: String,
  email: String,
  name: String,
  role: { type: String, enum: ["customer", "driver", "admin", "cafe"] },
  status: { type: String, enum: ["active", "suspended", "pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

module.exports = mongoose.model("User", userSchema);
