const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });

const CategorySchema = new mongoose.Schema(
  {
    category_text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Categogy = mongoose.model("Categories", CategorySchema);

module.exports = Categogy;
