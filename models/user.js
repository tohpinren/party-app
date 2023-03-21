const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for user
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "The email field is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "The password field is required"],
    trim: true,
  },
});

// Create model for user
const User = mongoose.model("user", UserSchema);

module.exports = User;
