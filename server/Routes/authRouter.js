const express = require("express");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
//if sign up not working its because isValidEmail
const { isValidEmail } = require("../utils/utils");

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username)
      return res.status(400).send("Username or Email is required.");
    if (!password) return res.status(400).send("Password is required.");

    // Find user by username
    const user = await User.findOne({ username });

    // If user is not found, return an error
    if (!user) return res.status(401).send("Invalid username or password.");

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid username or password.");
    // Generate JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send response
    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, fullname } = req.body;
    // Check username field
    if (!username) return res.status(400).send("Username is required.");

    // Check if email is valid
    if (!email || !isValidEmail(email))
      return res.status(400).send("Valid email is required.");

    // Check password field
    if (!password) return res.status(400).send("Password is required.");

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      username,
      email,
      password: hashedPassword,
      fullname,
    });
    userData.save();

    return res
      .status(200)
      .json({ message: "Signup successful", username, email, hashedPassword });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
