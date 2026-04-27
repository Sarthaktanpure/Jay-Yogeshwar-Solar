const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true, trim: true, index: true },
    userId: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, required: true, trim: true, lowercase: true },
    text: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
