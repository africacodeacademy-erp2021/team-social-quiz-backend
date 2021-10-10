const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoSanitize = require('express-mongo-sanitize');
const InitiateMongoServer = require('./server')



const user = require('./routes/auth')
const login = require('./routes/login')
const getuser = require('./routes/auth')
const app = express();

InitiateMongoServer()

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({
    path: ".env"
  });

  //sanitize requests against special chars, some precaution against NoSQL Injection Attacks
app.use(mongoSanitize())

/**
 * Connect to MongoDB.
 */
 const connection = require("../models/Connection.js")
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);


mongoose.connect(process.env.DATABASE_URI);

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


app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});

module.exports = app;