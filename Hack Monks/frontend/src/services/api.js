import axios from 'axios';

// Set the base URL for your API (adjust based on your environment)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

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
    const response = await api.post('/signup', userData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login API call
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/login', loginData);
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export default api;
