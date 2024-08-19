// src/store/reducers/authReducer.js

const initialState = {
    isLoggedIn: false,
    token: null,
    userId: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          token: action.payload.token,
          userId: action.payload.userId,
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
        
    }
  };
  
  export default authReducer;
  