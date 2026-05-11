const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const homeShowcaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "", trim: true },
    image: { type: mediaSchema, required: true },
    status: { type: String, default: "active", trim: true },
  },
  { timestamps: true },
);

module.exports = mongoose.models.HomeShowcase || mongoose.model("HomeShowcase", homeShowcaseSchema);
