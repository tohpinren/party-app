const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Make sure inputs are not empty
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check for existing user
    const oldUser = await User.findOne({ email });

    // If found, return error
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash and salt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Create and assign a token
    const token = jwt.sign(
      { _id: savedUser._id, email: savedUser.email },
      process.env.REACT_APP_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Save token
    savedUser.token = token;

    // res.header("auth-token", token).json(savedUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Make sure inputs are not empty
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Find user in database
    const user = await User.findOne({ email });

    // If not found, return error
    if (!user) {
      return res.status(401).json({ message: "Email not found" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);

    // If not valid, return error
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    // Create and assign a token
    const token = jwt.sign(
      { _id: user._id },
      process.env.REACT_APP_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, email: user.email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res
    .status(200)
    .json({ message: "User logged out successfully", success: true });
});

module.exports = router;
