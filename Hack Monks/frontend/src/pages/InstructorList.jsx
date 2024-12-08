import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getInstructorData, updateInstructorData } from '../services/api'; // Add the update API
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('user@example.com'); // Replace with actual user email logic

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getInstructorData();
        setInstructors(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching instructor data:', error);
        toast.error('Failed to fetch data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRemoveRow = (index) => {
    const updatedInstructors = instructors.filter((_, i) => i !== index);
    setInstructors(updatedInstructors);
  };

  const handleOpenCard = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleCloseCard = () => {
    setSelectedInstructor(null);
  };

  const handleBookSlot = async () => {
    if (!selectedInstructor) return;
  
    const updatedSlots = selectedInstructor.slots - 1;
    if (updatedSlots < 0) {
      toast.error('No slots available.');
      return;
    }
  
    try {
      // Prepare the updated instructor data
      const updatedInstructor = {
        ...selectedInstructor,
        slots: updatedSlots,
        bookedBy: [...selectedInstructor.bookedBy, userEmail], // Add user email to bookings
      };
  
      await updateInstructorData(selectedInstructor._id, updatedInstructor); // Make the API call to update data
  
      // Update the UI
      setInstructors((prev) =>
        prev.map((instructor) =>
          instructor._id === selectedInstructor._id ? updatedInstructor : instructor
        )
      );
  
      toast.success('Slot booked successfully!');
      setSelectedInstructor(null);
    } catch (error) {
      console.error('Error booking slot:', error);
      toast.error('Failed to book slot.');
    }
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center px-4 w-10/12 mx-auto">
      <div className="p-8 space-y-6 bg-white bg-opacity-20 rounded shadow-md text-white">
        <h2 className="text-2xl font-bold">Instructor Data</h2>
        {instructors.length === 0 ? (
          <p>No instructors found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white"> {/* Changed the background color of the header row */}
                <th className="border border-gray-300 px-6 py-3">Location</th>
                <th className="border border-gray-300 px-6 py-3">Slots</th>
                <th className="border border-gray-300 px-6 py-3">Target</th>
                <th className="border border-gray-300 px-6 py-3">Cost Per Slot</th>
                <th className="border border-gray-300 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor, index) => (
                <tr key={index} className="bg-transparent">
                  <td className="border border-gray-300 px-6 py-3">{instructor.location}</td>
                  <td className="border border-gray-300 px-6 py-3">{instructor.slots}</td>
                  <td className="border border-gray-300 px-6 py-3">{instructor.target.join(', ')}</td>
                  <td className="border border-gray-300 px-6 py-3">{instructor.costPerPlot}</td>
                  <td className="border border-gray-300 px-6 py-3 text-center flex justify-center space-x-2">
                    <FaCheckCircle
                      className="text-green-500 cursor-pointer"
                      onClick={() => handleOpenCard(instructor)}
                    />
                    <FaTimesCircle
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleRemoveRow(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedInstructor && (
        <div className="fixed top-1/3 left-1/3 p-6 bg-blue-600 bg-opacity-90 shadow-lg rounded border border-gray-300 w-1/2 text-white">
          <h3 className="text-lg font-bold">Book a Slot</h3>
          <p className="my-4">
            Location: <strong>{selectedInstructor.location}</strong>
          </p>
          <p className="my-4">
            Cost Per Plot: <strong>${selectedInstructor.costPerPlot}</strong>
          </p>
          <button
            className="px-6 py-3 bg-blue-800 text-white rounded hover:bg-blue-700"
            onClick={handleBookSlot}
          >
            Book a Slot
          </button>
          <button
            className="ml-4 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleCloseCard}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default InstructorList;
