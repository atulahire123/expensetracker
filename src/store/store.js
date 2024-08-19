import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './theme-slice'; // Ensure correct path

const store = configureStore({
  reducer: {
    authentication: authReducer,
    theme: themeReducer, // Make sure this matches your slice name
  },
});

export default store;
