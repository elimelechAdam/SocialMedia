const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "comment", "follow"], // Define acceptable notification types.
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    read: {
      type: Boolean,
      default: false, // Notifications are unread by default.
    },
    // TODO: Consider user interaction with notifications, such as clicking to view the related post or comment.
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
