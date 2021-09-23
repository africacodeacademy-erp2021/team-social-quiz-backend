const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });

const CategorySchema = new mongoose.Schema(
  {
    category_text: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

 mongoose.model("Category", CategorySchema);

module.exports = Categogy;
