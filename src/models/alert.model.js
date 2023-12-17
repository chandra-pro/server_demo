const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  alert_id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    unique: true,
  },
  overspeeding_count: {
    type: String,
    enum: ["highway", "residential", "commercial", "city_center"],
  },

  timestamp: {
    type: Date,
  },
});

module.exports = mongoose.model("alert", alertSchema);
