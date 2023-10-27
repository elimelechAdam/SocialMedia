const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: {
      type: String,
      required: true,
      // TODO: Add validation for content, e.g., maximum length.
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // TODO: Consider support for nested comments or comment threads.
    // TODO: Consider the implications of comment deletion on likes and related data.
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
