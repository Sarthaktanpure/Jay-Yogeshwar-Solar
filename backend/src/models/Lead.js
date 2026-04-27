const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    requirement: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Lead || mongoose.model("Lead", leadSchema);
