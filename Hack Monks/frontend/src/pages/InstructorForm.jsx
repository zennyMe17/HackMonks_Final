import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addInstructorData } from '../services/api'; // Import the helper function

const InstructorForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    slots: '',
    target: [],
    costPerPlot: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTargetChange = (e) => {
    const targets = e.target.value.split(',').map((t) => t.trim());
    setFormData({ ...formData, target: targets });
  };

  const handleSubmit = async (e) => {
    console.log('Form submission started');
    e.preventDefault();
    console.log('Default form submission prevented');
    try {
      console.log('Im in try Block');
      const savedData = await addInstructorData(formData); // Call the helper function
      toast.success('Data added successfully!');
      console.log(savedData);
    } catch (error) {
      console.log(formData);
      console.error('Error adding data:', error);
      toast.error('Failed to add data.');
    }
  };

  return (
    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 w-10/12 mx-auto ">
      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-6 bg-white bg-opacity-20 rounded shadow-md text-white"
      >
        <h2 className="text-2xl font-bold">Instructor Form</h2>

        <div>
          <label className="block font-medium text-lg">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-transparent border-white text-white placeholder-white focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-lg">Slots</label>
          <input
            type="number"
            name="slots"
            value={formData.slots}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-transparent border-white text-white placeholder-white focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-lg">Target (comma-separated)</label>
          <input
            type="text"
            name="target"
            value={formData.target.join(', ')}
            onChange={handleTargetChange}
            className="w-full p-3 border rounded bg-transparent border-white text-white placeholder-white focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-lg">Cost Per Plot</label>
          <input
            type="number"
            name="costPerPlot"
            value={formData.costPerPlot}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-transparent border-white text-white placeholder-white focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 text-lg text-white bg-blue-600 rounded hover:bg-blue-700 transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InstructorForm;
