const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  itemId: String,
  name: String,
  priceETB: Number,
  active: { type: Boolean, default: true },
});

const cafeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  area: String,
  address: String,
  geo: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [lng, lat]
  },
  menu: [menuItemSchema],
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  payoutMethod: { type: String, enum: ["chapa", "telebirr"], default: "chapa" },
});

cafeSchema.index({ geo: "2dsphere" });

module.exports = mongoose.model("Cafe", cafeSchema);
