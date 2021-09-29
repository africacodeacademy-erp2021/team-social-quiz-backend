/**
 * Module dependencies.
 */
const express = require("express");
const chalk = require("chalk");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require('body-parser')
/**
 * Create Express server.
 */
const app = express();

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({
  path: ".env",
});

// TODO: Data Sanitization against XSS

//sanitize requests against special chars, some precaution against NoSQL Injection Attacks
app.use(mongoSanitize());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())


/**
 * Connect to MongoDB.
 */
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("error", (err) => {
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
const quizController = require("./controllers/quiz");
/**
 * User Routes
 *
 * TODO: Protect user routes
 */
app.get("/users", userController.getAllUsers);
app.get("/getAllQuiz",quizController.getAllQuiz);
app.get("/getOneQuiz",quizController.getOneQuiz);
app.get("/getAllQs",quizController.getAllQs);
app.get("/getOneQ",quizController.getOneQ);
app.post("/updateQuiz",quizController.updateQuiz);
app.post("/createQuiz",quizController.createQuiz);

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
