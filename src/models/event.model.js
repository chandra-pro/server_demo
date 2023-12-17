const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  is_driving_safe: {
    type: Boolean,
    required: true,
  },
  vehicle_id: {
    type: String,
    unique: true,
  },
  location_type: {
    type: String,
    enum: ["highway", "residential", "commercial", "city_center"],
  },
  timestamp: {
    type: Date,
  },
});

module.exports = mongoose.model("events", eventSchema);
