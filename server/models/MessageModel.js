const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      // TODO: Add validation for content, e.g., maximum length.
    },
    read: {
      type: Boolean,
      default: false, // Messages are unread by default.
    },
    // TODO: Consider support for different types of messages (text, image, file, etc.).
    // TODO: Consider the implications of message deletion for sender and receiver.
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Message", MessageSchema);
