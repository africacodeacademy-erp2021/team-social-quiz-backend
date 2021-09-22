/**
 * Module dependencies.
 */
 const express = require("express");
 const chalk = require("chalk");
 const dotenv = require("dotenv");
 const mongoose = require("mongoose");
 const mongoSanitize = require('express-mongo-sanitize');


 /**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({
    path: ".env"
  });

// TODO: Data Sanitization against XSS

//sanitize requests against special chars, some precaution against NoSQL Injection Attacks
app.use(mongoSanitize())

 /**
 * Connect to MongoDB.
 */
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.on("error", err => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});



module.exports = app;