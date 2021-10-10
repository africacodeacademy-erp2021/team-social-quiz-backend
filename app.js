const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoSanitize = require('express-mongo-sanitize');
const http = require("http");



const user = require('./routes/auth')
const login = require('./routes/login')
const getuser = require('./routes/auth')
const app = express();



/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({
    path: ".env"
  });


const BASE_URL = "/api/v1"

require('./databaseConfig')

  //sanitize requests against special chars, some precaution against NoSQL Injection Attacks
app.use(mongoSanitize())



// PORT
const PORT = process.env.PORT || 4000;

//Middleware
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
}); 

app.use('/auth', user)
//app.use('/login', user)

app.use('/auth', login)
app.use('/getuser', getuser)

// controller imports

const categoryController = require("./controllers/category")
const quizController = require("./controllers/quiz")
const questionController = require("./controllers/questions")
// Category endpoints
app.post(`${BASE_URL}/category`, categoryController.createCategory)
app.get(`${BASE_URL}/category`, categoryController.getCategory)
app.get(`${BASE_URL}/catgeories`, categoryController.getCategories)

// Quiz endpoints
app.post(`${BASE_URL}/quiz`, quizController.createQuiz);
app.get(`${BASE_URL}/quizzes`, quizController.getAllQuiz)
app.get(`${BASE_URL}/quizzes/published`, quizController.getPublishedQuizes)
app.post(`${BASE_URL}/quiz/publish`, quizController.publishQuiz)
app.post(`${BASE_URL}/quiz/publish/remove`, quizController.unpublishQuiz)
app.get(`${BASE_URL}/quiz`, quizController.quizById)
app.put(`${BASE_URL}/quiz`, quizController.updateQuiz)

// Questions endpoints
app.get(`${BASE_URL}/questions/quiz`, questionController.getQuizQuestions)

http.createServer(app).listen(process.env.PORT, () => {
    console.log(
      "App is running at http://localhost:%d ",
      process.env.PORT,
    );
    
  });


module.exports = app;