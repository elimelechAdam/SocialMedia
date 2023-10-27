const express = require("express");
const User = require("../models/UserModel");
const userBLL = require("../BLL/UserBLL");
const { isValidEmail } = require("../utils/utils");
const { checkUserOwnership } = require("../middleware/token");

const router = express.Router();

// Update General Profile Info
// 65290ac00759778af5f0c456
router.put("/:userId/profile", checkUserOwnership, async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, profilePicture } = req.body;

    const user = await userBLL.updateUserProfile(
      userId,
      username,
      email,
      profilePicture
    );
    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View Profile
router.get("/:userName/profile", async (req, res) => {
  // Logic to retrieve and display user profile info
  const userId = req.params.userId;
  const userProfile = await User.findById(userId);

  //find by username
  const userName = req.params.userName; //Change to the params to username
  const userNameProfile = await User.find({ username: userName }); //finding by username

  if (!userNameProfile) {
    return res.status(404).json({ message: "User not found." });
  }
  res.status(200).json(userNameProfile);
});

// Update Email
router.put("/:userId/email", checkUserOwnership, async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const { email } = req.body;

    // Validate the new email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email." });
    }

    // Find user and update email
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email: email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // TODO: Optionally, initiate email verification process

    res.status(200).json({ message: "Email updated.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Password
router.put("/:userId/changePassword", checkUserOwnership, async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    await userBLL.changeUserPassword(userId, oldPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Follower
router.post(
  "/:userId/followers/:followerId",
  checkUserOwnership,
  async (req, res) => {
    try {
      const { userId, followerId } = req.params;
      console.log(userId, followerId);
      const user = await userBLL.addFollower(userId, followerId);
      res.status(200).json({ message: "Follower added.", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Remove Follower
router.delete(
  "/:userId/followers/:followerId",
  checkUserOwnership,
  async (req, res) => {
    try {
      const { userId, followerId } = req.params;

      const user = await userBLL.removeFollower(userId, followerId);
      res.status(200).json({ message: "Follower removed.", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// View Followers
router.get("/:userId/followers", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user and get followers
    const user = await userBLL.viewFollowers(userId); // if followers are references to user documents

    res.status(200).json({ followers: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
