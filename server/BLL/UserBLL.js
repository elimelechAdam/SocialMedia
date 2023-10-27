const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

async function viewFollowers(userId) {
  const user = await User.findById(userId).populate("followers"); // if followers are references to user documents
  console.log(user.followers);
  if (!user) {
    throw new Error("User not found.");
  }
  return user.followers;
}

async function changeUserPassword(userId, oldPassword, newPassword) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new Error("Old password is incorrect.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return user;
}

async function updateUserProfile(userId, username, email, profilePicture) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  // Here, add any validation for the inputs that you need
  // For example, check if email is already in use by another user, if username meets criteria, etc.

  if (username) user.username = username;
  if (email) user.email = email;
  if (profilePicture) user.profilePicture = profilePicture;

  await user.save();

  return user; // or some confirmation message
}

async function addFollower(userId, followerId) {
  const user = await User.findById(userId);
  const follower = await User.findById(followerId);

  if (!user || !follower) {
    throw new Error("User or follower not found.");
  }

  // Prevent duplicate followings/followers
  if (user.following.includes(followerId)) {
    throw new Error("Already following.");
  }

  // Add the followerId to the user's 'following' list
  user.following.push(followerId);

  // Add the userId to the follower's 'followers' list
  follower.followers.push(userId);

  // Save the updates to both users
  await user.save();
  await follower.save();

  return { user, follower };
}

async function removeFollower(userId, followerId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const followerIndex = user.followers.indexOf(followerId);
  if (followerIndex === -1) {
    throw new Error("Follower not found.");
  }

  user.followers.splice(followerIndex, 1);
  await user.save();

  return user; // or some confirmation message
}
module.exports = {
  changeUserPassword,
  updateUserProfile,
  addFollower,
  removeFollower,
  viewFollowers,
};
