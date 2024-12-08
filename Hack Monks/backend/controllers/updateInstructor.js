const updateInstructor = async (req, res) => {
    const { id } = req.params;
    const { slots, bookedBy } = req.body;
  
    try {
      const updatedInstructor = await Instructor.findByIdAndUpdate(
        id,
        { slots, bookedBy },
        { new: true }
      );
      res.status(200).json(updatedInstructor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { addInstructorData, getAllInstructors, updateInstructor };
  