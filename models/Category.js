const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

 const Categogy = mongoose.model("Category", CategorySchema);

module.exports = Categogy;
