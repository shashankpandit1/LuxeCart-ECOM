// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// Define routes and link them to controller methods
router.get('/', testimonialController.getTestimonial);      // Get all tasks

module.exports = router;
