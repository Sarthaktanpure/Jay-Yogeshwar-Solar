const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ["solar", "motor"], required: true },
    hp: { type: Number, min: 0 },
    kw: { type: Number, min: 0 },
    priceRange: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
