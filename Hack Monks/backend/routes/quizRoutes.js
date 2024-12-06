const express = require('express');
const router = express.Router();
const { submitQuiz } = require('../controllers/quizController');  // Import the controller function

// Define the route for submitting the quiz
router.post('/', submitQuiz);

module.exports = router;
