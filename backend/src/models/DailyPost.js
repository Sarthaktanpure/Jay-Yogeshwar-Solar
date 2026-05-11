const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const dailyPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "", trim: true },
    kind: { type: String, default: "notice", trim: true },
    image: { type: mediaSchema, required: true },
    status: { type: String, default: "active", trim: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.models.DailyPost || mongoose.model("DailyPost", dailyPostSchema);
