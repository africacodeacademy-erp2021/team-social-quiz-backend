const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", function () {
    console.log("Connected successfully");
  })
  .on("error", function (error) {
    console.error("error is :", error);
  });

const { User } = require("./User");
const Category = require("./Category");
const { Game } = require("./Game");
