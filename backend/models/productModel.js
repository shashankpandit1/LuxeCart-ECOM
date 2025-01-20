const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  canBeDeleted: {
    type: Boolean,
    default: true,
  },
});

// Create task model
const product = mongoose.model("Product", productSchema);

module.exports = product;
