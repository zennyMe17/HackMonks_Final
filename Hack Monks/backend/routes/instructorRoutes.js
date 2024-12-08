const express = require('express');
const router = express.Router();
const {
  addInstructorData,
  getAllInstructors,
  bookInstructorSlot, // Import the new function
} = require('../controllers/instructorController');

// Define routes
router.post('/instructors', addInstructorData);
router.get('/instructors', getAllInstructors);
router.put('/instructors/:id/book', bookInstructorSlot); // New route for booking

module.exports = router;
