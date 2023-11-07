const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      // TODO: Add validation for content, e.g., maximum length.
    },
    image: {
      type: String,
      // Reminder: Ensure secure handling of image uploads.
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    // TODO: Consider the implications of post deletion on likes, comments, and related data.
    // TODO: Consider implementing privacy settings for posts.
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Post", PostSchema);
