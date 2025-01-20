const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  cta: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Create task model
const product = mongoose.model("Category", categorySchema);

module.exports = product;
