const mongoose = require("mongoose");

// Reminder: Ensure passwords are hashed before storage for security purposes.
// Consider using a library like 'bcrypt' for password hashing.

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // TODO: Add validation for email format.
    },
    password: {
      type: String,
      required: true,
      // TODO: Implement password strength requirements.
    },
    profilePicture: {
      type: String,
      default: "defaultProfilePicture.png", // Specify a default profile picture.
    },
    fullname: {
      type: String,
      required: true,
    },
    bio: { type: String, default: null },
    privacy: {
      type: String,
      enum: ["public", "private", "followersOnly"],
      default: "public", // Users' profiles are public by default.
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: 0,
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: 0,
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: 0,
      },
    ],
    // TODO: Consider adding fields for authentication tokens if session management is implemented.
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", UserSchema);
