"use strict";
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");

router.post("/login", userController.login);
router.post("/registration", userController.registration);
router.post("/token", userController.token);
router.post("/logout", verifyAccessToken, userController.logout);
router.get("/", verifyAccessToken, userController.getAll);
module.exports = router;
