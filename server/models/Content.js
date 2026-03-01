const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["industry", "material", "testimonial", "product", "feature", "section"],
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  content: String,
  icon: String,
  color: String,
  imageUrl: String,
  rating: Number,
  author: String,
  company: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

// Update the updatedAt field on save
ContentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Content", ContentSchema);
