// src/component/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
