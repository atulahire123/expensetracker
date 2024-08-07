import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  token: '',
  userId: '',
  isLoggedIn: false,
  login: (token, userId) => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const navigate = useNavigate();

  
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
    navigate('/login');
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, userId, isLoggedIn, login: loginHandler, logout: logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
