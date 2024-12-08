import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
};

// Safely parse JSON to prevent app crashes due to malformed data
try {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    initialState.user = storedUser;
    initialState.isLoggedIn = true;
  }
} catch (error) {
  console.error('Failed to parse stored user data:', error);
  // Proceed with defaults if parsing fails
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { payload } = action;
      state.user = {
        ...payload,
        role: payload.role || 'user', // Default role to 'user' if not provided
      };
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(state.user)); // Persist user data to localStorage
    },
    signup(state, action) {
      const { payload } = action;
      state.user = {
        ...payload,
        role: payload.role || 'user',
      };
      state.isLoggedIn = false; // User remains logged out until they log in
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user'); // Remove user data from localStorage
    },
    initializeAuth(state) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          state.user = storedUser;
          state.isLoggedIn = true;
        }
      } catch (error) {
        console.error('Failed to initialize auth state:', error);
        state.user = null;
        state.isLoggedIn = false;
      }
    },
  },
});

export const { login, signup, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
