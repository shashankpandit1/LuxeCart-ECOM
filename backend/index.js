require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error(err));

const productRoutes = require('./routes/productRoutes');
app.use('/products',productRoutes);

const categoryRoutes = require('./routes/categoryRoutes');
app.use('/category',categoryRoutes);

const testimonialRoutes = require('./routes/testimonialRoutes');
app.use('/testimonials',testimonialRoutes);

const PORT = process.env.PORT || 5000;
// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



