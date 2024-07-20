import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import './AuthForm.css';

const AuthForm = ({ isSignup }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const url = isSignup
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18';

    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      if (!response.ok) {
        let errorMessage = 'Authentication failed!';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      if (isSignup) {
        alert('User created successfully! Please log in.');
        navigate('/login');
      } else {
        authCtx.login(data.idToken, data.localId);
        navigate('/home');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPasswordHandler = async () => {
    const email = emailRef.current.value;
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }
    try {
      setIsResetting(true);
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18', {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to send password reset email. Please try again later.');
      }
      alert('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center mt-5">
      <Card className="card">
        <Card.Body>
          <Card.Title className="text-center card-title">{isSignup ? 'Sign Up' : 'Login'}</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
            </Form.Group>
            <Button type="submit" className="btn1" disabled={isLoading}>
              {isLoading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
            </Button>
          </Form>
          {!isSignup && (
            <div className="reset-password">
              <Button onClick={resetPasswordHandler} className="btn-link" disabled={isResetting}>
                {isResetting ? <Spinner animation="border" size="sm" /> : 'Forgot Password?'}
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </section>
  );
};

export default AuthForm;
