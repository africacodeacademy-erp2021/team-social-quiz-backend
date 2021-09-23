const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });

mongoose.connection
  .once("open", function () {
    console.log("Connected successfully");
  })
  .on("error", function (error) {
    console.error("error is :", error);
  });
