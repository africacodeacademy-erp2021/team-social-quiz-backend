const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const http = require("http");

const user = require("./routes/auth");
const login = require("./routes/login");
const getuser = require("./routes/auth");
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "TSQ backend  API",
      description: "TSQ API documentation",
      contact: {
        name: "Africa Code Academy",
      },
      servers: ["http://ec2-13-245-160-50.af-south-1.compute.amazonaws.com"],
    },
  },
  //
  apis: ["./docs/endpointsdocs.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log(swaggerDocs);

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({
  path: ".env",
});

const BASE_URL = "/api/v1";

require("./databaseConfig");

//sanitize requests against special chars, some precaution against NoSQL Injection Attacks
app.use(mongoSanitize());

// PORT
const PORT = process.env.PORT || 4000;

//Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/auth", user);
//app.use('/login', user)


app.use("/auth", login);
app.use("/getuser", getuser);

// controller imports

const categoryController = require("./controllers/category");
const quizController = require("./controllers/quiz");
const questionController = require("./controllers/questions");
const authController = require("./controllers/authentication");
const userController = require("./controllers/user");
const gameController = require("./controllers/game");

// Auth endpoints
app.post(`${BASE_URL}/register`, authController.register);
app.post(`${BASE_URL}/account`, authController.adminAccount);

// Category endpoints
app.post(`${BASE_URL}/category`, categoryController.createCategory);
app.get(`${BASE_URL}/category`, categoryController.getCategory);
app.get(`${BASE_URL}/catgeories`, categoryController.getCategories);

// Quiz endpoints
app.post(`${BASE_URL}/quiz`, quizController.createQuiz);
app.get(`${BASE_URL}/quizzes`, quizController.getAllQuiz);
app.get(`${BASE_URL}/quizzes/published`, quizController.getPublishedQuizes);
app.put(`${BASE_URL}/quiz/publish`, quizController.publishQuiz);
app.put(`${BASE_URL}/quiz/publish/remove`, quizController.unpublishQuiz);
app.get(`${BASE_URL}/quiz`, quizController.quizById);
app.put(`${BASE_URL}/quiz`, quizController.updateQuiz);
app.get(`${BASE_URL}/quiz/popular`, quizController.getPopularQuiz);
app.get(`${BASE_URL}/quiz/trending`, quizController.getPopularQuiz2);

// Questions endpoints
app.get(`${BASE_URL}/questions/quiz`, questionController.getQuizQuestions);

// User endpoints
app.get(`${BASE_URL}/users`, userController.getAllUsers);
app.get(`${BASE_URL}/players`, userController.getPlayers);
app.get(`${BASE_URL}/admins`, userController.getAdmins);
app.get(`${BASE_URL}/player`, userController.getPlayer);
app.put(`${BASE_URL}/player/admin`, userController.elevateToAdmin);
app.put(`${BASE_URL}/player/suspend`, userController.suspendPlayer);
app.put(`${BASE_URL}/player/revive`, userController.revivePlayer);

// Game endpoints
app.post(
  `${BASE_URL}/game/singleplayer`,
  gameController.initializeSinglePlayerGame
);
app.post(
  `${BASE_URL}/game/multiplayer`,
  gameController.initializeMultiplayerGame
);
app.post(`${BASE_URL}/game/teams`, gameController.initializeTeamGame);
app.put(
  `${BASE_URL}/game/singleplayer/start`,
  gameController.startSinglePlayerGame
);

app.put(`${BASE_URL}/game/answer`, gameController.submitQuestionAnswer); // Incomplete
app.post(`${BASE_URL}/game/question/next`, gameController.getNextQuestion); // Incomplete
app.put(`${BASE_URL}/game/restartgame`, gameController.restartGame);

http.createServer(app).listen(process.env.PORT, "0.0.0.0", () => {
  console.log("App is running at http://localhost:%d ", process.env.PORT);
});

module.exports = app;
