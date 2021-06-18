"use strict";
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 150,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
    },

    activeStatus: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "root"],
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
