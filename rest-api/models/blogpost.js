import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  markdownContent: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.model("BlogPost", BlogPostSchema);
