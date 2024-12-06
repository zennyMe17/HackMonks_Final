import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import axios from 'axios';

const QuizPage = () => {
  const navigate = useNavigate();

  // Fetch the logged-in user's data from the Redux store
  const user = useSelector((state) => state.auth.user); // Assuming 'auth' is the slice where user data is stored

  // Always call useState and other hooks before any early returns
  const questions = [
    'How do you handle stress?',
    'How do you deal with a difficult colleague?',
    'What is your approach to teamwork?',
    'How do you handle criticism?',
    'How do you prioritize tasks?',
    'How do you handle failure?',
    'How do you maintain work-life balance?',
    'How do you handle multiple projects at once?',
    'How do you approach learning new skills?',
    'How do you handle conflicts at work?',
  ];

  const options = ['Very Well', 'Well', 'Neutral', 'Poorly', 'Very Poorly'];

  const [responses, setResponses] = useState(
    Array(questions.length).fill('') // Initialize responses with empty values
  );

  // Redirect to login if the user is not logged in
  if (!user) {
    navigate('/login'); // Redirect user to the login page if not logged in
    return null;
  }

  const handleResponseChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = questions.map((question, index) => ({
      question,
      answer: responses[index],
    }));

    try {
      const API_URL = 'http://localhost:5000/api/auth/quiz'; // Adjust API URL as needed
      const response = await axios.post(API_URL, {
        name: user.name, // Send the logged-in user's name from the Redux state
        responses: responseData,
      });
      alert(response.data.message);
      navigate('/'); // Redirect to home page after success
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8/12 bg-gray-800 p-8 rounded-lg shadow-lg text-white min-h-[600px]">
      <h2 className="text-3xl font-semibold text-center mb-6">Behavior Quiz</h2>
      <form onSubmit={handleSubmit} className="h-full overflow-y-auto">
        <div className="mb-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-800 scrollbar-rounded pr-4">
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <p className="mb-2">{index + 1}. {question}</p>
              <select
                className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={responses[index]}
                onChange={(e) => handleResponseChange(index, e.target.value)}
                required
              >
                <option value="" disabled>Select an option</option>
                {options.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-300"
          >
            Submit
          </button>
          <button
            type="button"
            className="ml-4 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold transition duration-300"
            onClick={() => navigate('/')}
          >
            Return Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizPage;
