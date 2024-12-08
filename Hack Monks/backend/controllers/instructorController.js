const Instructor = require('../models/Instructor');

// Add instructor data
const addInstructorData = async (req, res) => {
  const { location, slots, target, costPerPlot } = req.body;

  try {
    const newInstructor = new Instructor({
      location,
      slots,
      target,
      costPerPlot,
    });

    const savedInstructor = await newInstructor.save();
    res.status(201).json(savedInstructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all instructor data
const getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle booking of instructor slots
const bookInstructorSlot = async (req, res) => {
  const { id } = req.params;
  const { slots, bookedBy } = req.body;
  
  try {
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      id,
      { 
        slots: slots - 1,  // Reduce the number of available slots by 1
        bookedBy: [...bookedBy, req.body.userEmail]  // Add the user's email to the bookedBy array
      },
      { new: true }
    );
    res.status(200).json(updatedInstructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { addInstructorData, getAllInstructors, bookInstructorSlot };
