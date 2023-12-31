const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    password: String,
    token: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
