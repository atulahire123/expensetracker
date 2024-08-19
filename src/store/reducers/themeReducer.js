import { createSlice } from '@reduxjs/toolkit';

const initialThemeState = {
  theme: 'light', // Default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
