import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAuthenticated: !!localStorage.getItem('authtoken'), // Check local storage for token
  token: localStorage.getItem('authtoken'),
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    loginHandler(state, action) {
      localStorage.setItem('authtoken', action.payload); // Store token in localStorage
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logoutHandler(state) {
      localStorage.removeItem('authtoken'); // Remove token from localStorage
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
