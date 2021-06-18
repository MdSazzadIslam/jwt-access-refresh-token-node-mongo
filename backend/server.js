"use strict";
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const logger = require("morgan");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");

//////////Routes///////////////////////////////////////////////////////
const userRoute = require("./routes/userRoute");
//////////////////////////////////////////////////////////////////////
const connectDB = require("./config/db");

const main = async () => {
  //calling database connection
  await connectDB();

  //Initializing app
  const app = express();
  // parse requests of content-type - application/json
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  //morgan only use for developement purpose
  if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
  }

  //create a write stream(in append mode)
  var accessLogStream = fs.createWriteStream(
    path.join(__dirname, "/logs/access.log"),
    { flags: "a" }
  );
  //setup the logger
  app.use(logger("combined", { stream: accessLogStream }));

  app.use("/api/user", userRoute);

  app.listen(process.env.PORT, () => {
    console.log(
      `⚡️[server]: running at http://localhost:${process.env.PORT}  ${process.env.NODE_ENV}`
    );
  });
};
main().catch((err) => {
  console.log(err);
});
