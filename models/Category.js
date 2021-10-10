const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    text: {
      type: String,
      unique:true
    },
  },
  {
    timestamps: true,
  }
);

 const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
