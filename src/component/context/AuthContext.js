// src/context/AuthContext.js
import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext({
  token: '',
  userId: '',
  login: (token) => {},
  logout: () => {},
});

const AuthProvider = (props) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const loginHandler = (token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  };

  const logoutHandler = () => {
    setToken('');
    setUserId('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        userId: userId,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
