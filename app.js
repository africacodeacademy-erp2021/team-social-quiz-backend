const express = require('express');
const bodyParser = require("body-parser");
const InitiateMongoServer = require('./server')


const myuser = require('./routes/auth')
const app = express();

InitiateMongoServer()



// PORT
const PORT = process.env.PORT || 4000;

//Middleware
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
}); 

app.use('/auth', myuser)


app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});