import axios from 'axios';

// Set the base URL for your API (adjust based on your environment)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create an Axios instance with default configurations
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Signup API call
export const signupUser = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login API call
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('auth/login', loginData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addInstructorData = async (instructorData) => {
  try {
    const response = await api.post('/instructors', instructorData);
    return response.data; // Return the saved instructor data
  } catch (error) {
    console.log("object")
    throw error.response?.data || error.message;
  }
};

export const getInstructorData = async () => {
  try {
    const response = await api.get('/instructors'); // Ensure the URL matches your backend route
    return response.data;
  } catch (error) {
    console.error('Error fetching instructor data:', error);
    throw error.response?.data || error.message;
  }
};

export const updateInstructorData = async (id, instructorData) => {
  try {
    const response = await api.put(`/instructors/${id}/book`, instructorData); // Updated URL to match your backend route
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export default api;
