// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Define routes and link them to controller methods
router.get('/', categoryController.getCategory);      // Get all tasks

module.exports = router;
