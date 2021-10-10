/**
 * Module dependencies.
 */
 const express = require("express");
 const chalk = require("chalk");
 const dotenv = require("dotenv");
 const mongoose = require("mongoose");
 const mongoSanitize = require('express-mongo-sanitize');
 const bodyParser = require("body-parser");

 

 /**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({
    path: ".env"
  });

  
// TODO: Data Sanitization against XSS
const app = express();
//sanitize requests against special chars, some precaution against NoSQL Injection Attacks
app.use(mongoSanitize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));


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
 const publishQuizController = require("./controllers/Publish_quiz");
/**
 * User Routes
 * 
 * TODO: Protect user routes
 */
 app.get("/users", userController.getAllUsers);
 app.put("/quizzes", publishQuizController.QuizPublish );
 

/**
 * Create Express server.
 */
//const app = express();

/**
 * Express configuration.
 */
app.set("host", "127.0.0.1");
app.set("port", process.env.PORT);


app.listen(app.get("port"), () => {
    console.log(
        "%s App is running at http://localhost:%d in %s mode",
        chalk.green("✓"),
        app.get("port")
    );
});

module.exports = app;