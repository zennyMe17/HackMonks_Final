import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Load user from localStorage
  isLoggedIn: !!localStorage.getItem('user'), // Determine login state from localStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = { ...action.payload, role: action.payload.role || 'user' }; // Set user with role
      state.isLoggedIn = true; // Mark as logged in
      localStorage.setItem('user', JSON.stringify(state.user)); // Persist user
    },
    signup(state, action) {
      state.user = { ...action.payload, role: action.payload.role || 'user' }; // Set user with role
      state.isLoggedIn = false; // Default to logged-out state after signup
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false; // Reset login state
      localStorage.removeItem('user'); // Clear user from localStorage
    },
    initializeAuth(state) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        state.user = user;
        state.isLoggedIn = true; // Set as logged in if user exists in localStorage
      }
    },
  },
});

export const { login, signup, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
