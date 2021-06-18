"use strict";
const User = require("../models/userModel");

class UserService {
  registration = async (data) => {
    return await User(data).save();
  };

  checkEmailExist = async (email) => {
    return await User.findOne({ email });
  };

  checUserExist = async (data) => {
    const { email, password } = data;
    return await await User.findOne({ email }).select("+password");
  };

  getAll = async () => {
    return await User.find({});
  };
}

module.exports = new UserService();
