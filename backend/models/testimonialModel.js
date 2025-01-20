const mongoose = require("mongoose");

const testimonialScema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
});

// Create task model
const product = mongoose.model("Testimonials", testimonialScema);

module.exports = product;
