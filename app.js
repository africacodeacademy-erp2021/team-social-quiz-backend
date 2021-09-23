require("dotenv").config();

const mongoose = require('mongoose');
const express = require("express");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection successful!');
}).catch((e) => {
    console.log('Connection failed!');
})



const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
console.log(`Server is running at ${port}`);
});
