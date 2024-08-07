// src/store/themeReducer.js
const initialState = {
    theme: 'light', // Default theme
  };
  
  const themeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        return {
          ...state,
          theme: state.theme === 'light' ? 'dark' : 'light',
        };
      default:
        return state;
    }
  };
  
  export default themeReducer;
  