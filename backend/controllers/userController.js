"use strict";

require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcrypt");
const UserService = require("../services/userService");
const accessToken = require("../middlewares/accessToken");
const refreshToken = require("../middlewares/refreshToken");
const removeToken = require("../middlewares/removeToken");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.json({
        success: false,
        msg: "Please enter email and password.",
      });
    } else {
      try {
        const user = await UserService.checUserExist(req.body);
        if (user === undefined || user === null) {
          return res
            .status(401)
            .send({ success: false, msg: "User not found" });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (passwordIsValid === false)
          return res.json({
            success: false,
            msg: "Password is invalid!!!",
          });
        if (!passwordIsValid)
          return res.status(401).send({
            msg: "Password is not valid.",
            success: false,
            token: null,
          });

        if (user) {
          //creating a access and refresh token
          var aToken = await accessToken(user._id);
          var rToken = await refreshToken(user._id);
          return res.json({
            success: true,
            msg: "Successfull",
            _id: user._id,
            name: user.name,
            email: user.email,
            status: user.status,
            role: user.role,
            accessToken: aToken,
            refreshToken: rToken,
          });
        } else {
          return res
            .status(401)
            .send({ success: false, msg: "Please check all the data" });
        }
      } catch (err) {
        return res.status(500).json({ success: false, msg: err.message });
      }
    }
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.registration = async (req, res, next) => {
  debugger;

  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res
        .status(401)
        .send({ success: false, msg: "Please fillup required field." });
    } else if (password.length < 8) {
      return res.status(401).send({
        success: false,
        msg: "Password must be at least 8 characters.",
      });
    } else {
      const userExists = await UserService.checkEmailExist(email);
      if (userExists) {
        return res.status(400).send({
          success: false,
          msg: "Email already exists",
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email,
        password: passwordHash,
      };

      const user = await UserService.registration(newUser);

      if (user) {
        var aToken = await accessToken(userExists._id);
        var rToken = await refreshToken(userExists._id);

        res.status(200).send({
          success: true,
          msg: "Register Success",
        });
      } else {
        return res.status(500).send({
          success: false,
          msg: "Something went wrong",
          accessToken: aToken,
          refreshToken: rToken,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.logout = async (req, res, next) => {
  try {
    console.log("Logout");
    const token = req.body.refreshToken;
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const res = removeToken(decoded.id, token);
    console.log(res);

    return res.json({ success: true, msg: "Logged out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.token = async (req, res, next) => {
  const token = req.body.refreshToken;
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const aToken = accessToken(decoded.id);
  const rToken = refreshToken(decoded.id);
  return res.json({
    msg: "success",
    accessToken: aToken,
    refreshToken: rToken,
  });
};

exports.getAll = async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    res.status(200).send({
      users,
      msg: "Data fetch done",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
