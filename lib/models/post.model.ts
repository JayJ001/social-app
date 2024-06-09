import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
});

const Post = mongoose.models.Post || mongoose.model("posts", postSchema);

export default Post;
