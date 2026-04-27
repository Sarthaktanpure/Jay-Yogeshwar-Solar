const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    category: { type: String, required: true, trim: true },
    farmerName: { type: String, default: "", trim: true },
    images: { type: [mediaSchema], default: [] },
    videos: { type: [mediaSchema], default: [] },
    location: { type: String, default: "", trim: true },
    systemType: { type: String, default: "", trim: true },
    capacityKw: { type: Number, default: 0 },
    growthValue: { type: Number, default: 0 },
    status: { type: String, default: "active", trim: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Project || mongoose.model("Project", projectSchema);
