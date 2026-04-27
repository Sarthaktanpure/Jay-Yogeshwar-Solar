const mongoose = require("mongoose");

const trendSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    source: { type: String, default: "", trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Trend || mongoose.model("Trend", trendSchema);
