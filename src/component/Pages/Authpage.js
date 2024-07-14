// src/component/Pages/Authpage.js
import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
//import './Authpage.css';

const Authpage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Authentication failed!');
      }

      const data = await response.json();
      authCtx.login(data.idToken);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h3 className="headers">Login</h3>
      <form onSubmit={loginHandler}>
        <div className="form-control">
          <label>Email</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" ref={passwordRef} required />
        </div>
        <div className="actions">
          <button className="btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Authpage;
