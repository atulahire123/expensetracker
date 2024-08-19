import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themeActions } from '../../store/theme-slice'; // Ensure correct path

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Correctly accessing the theme

  const toggleThemeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  return (
    <button onClick={toggleThemeHandler}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

export default ThemeToggle;
