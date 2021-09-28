const mongoose = require("mongoose");


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
