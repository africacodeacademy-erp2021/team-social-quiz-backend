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
  const app = express();

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

/**
 * Controllers.
 */
 const userController = require("./controllers/user");
 const googleAuth = require("./controllers/GoogleAuthentication");
 const githubAuth = require("./controllers/githubAuthentication");

/**
 * User Routes
 * 
 * TODO: Protect user routes
 */
 app.get("/users", userController.getAllUsers);
 app.get("/googleAuth", googleAuth.getGoogleUsers);
 app.get("/githubAuth", githubAuth.getGithubUsers ); 

/**
 * Create Express server.
 */


/**
 * Express configuration.
 */
//app.set("host", "127.0.0.1");
//app.set("port", process.env.PORT);
app.set('port', (process.env.PORT || 8000));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  if (err) 
  {
    console.log("We have error");
    console.log(err);
    return;
  }
  console.log('listening on port 8000');
});


module.exports = app;