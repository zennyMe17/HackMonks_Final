const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  slots: {
    type: Number,
    required: true,
  },
  target: {
    type: [String], // Array of strings
    required: true,
  },
  costPerPlot: {
    type: Number,
    required: true,
  },
  bookedBy: {
    type: [String], // Store emails of users who book slots
    default: [],
  },
});

module.exports = mongoose.model('Instructor', InstructorSchema);
