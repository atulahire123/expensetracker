import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import './AuthForm.css';

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = isSignup ? confirmPasswordRef.current.value : null;

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const url = isSignup
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18`;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email:email, password:password, returnSecureToken: true }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = 'Authentication failed!';
        if (data.error?.message === 'EMAIL_EXISTS') {
          setIsSignup(false); 
          setError('Account already exists! Please log in.');
        } else {
          setError(data.error?.message || errorMessage);
        }
        throw new Error(errorMessage);
      }

      localStorage.setItem('token', data.idToken);
      localStorage.setItem('userId', data.localId);

      if (isSignup) {
        await sendVerificationEmail(data.idToken);
        alert('User created successfully! Please verify your email.');
        navigate('/complete-profile'); // Navigate to Complete Profile page
      } else {
        dispatch(authActions.loginHandler(data.idToken));
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationEmail = async (token) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestType: 'VERIFY_EMAIL', idToken: token }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send verification email.');
      }

      alert('Verification email sent. Please check your inbox.');
    } catch (error) {
      console.error('Verification email error:', error);
      setError(error.message);
    }
  };

  const resetPasswordHandler = async () => {
    const email = emailRef.current.value;
    if (!email) {
      setError('Please enter your email to reset the password.');
      return;
    }

    setIsResetting(true);
    setError(null);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18`,
        {
          method: 'POST',
          body: JSON.stringify({ requestType: 'PASSWORD_RESET', email }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || 'Failed to send password reset email.');
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
          <Card.Title className="text-center card-title">
            {isSignup ? 'Sign Up' : 'Login'}
          </Card.Title>
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
            {isSignup && (
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordRef} required />
              </Form.Group>
            )}
            <Button type="submit" className="btn1" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : isSignup ? 'Sign Up' : 'Login'}
            </Button>
          </Form>
          {!isSignup && (
            <div className="reset-password">
              <Button onClick={resetPasswordHandler} className="btn-link" disabled={isResetting}>
                {isResetting ? <Spinner animation="border" size="sm" /> : 'Forgot Password?'}
              </Button>
            </div>
          )}
          <div className="mt-3 text-center">
            <Button variant="link" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Already have an account? Login' : 'Create new account'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

export default AuthForm;
