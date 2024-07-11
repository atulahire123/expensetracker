import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import './AuthForm.css';

const AuthForm = ({ isSignup }) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = emailRef.current.value;

        let url = isSignup
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18';

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ email, password, returnSecureToken: true }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error.message === 'EMAIL_EXISTS') {
                    alert('Email already exists. Redirecting to login page.');
                    navigate('/login');
                } else if (data.error.message === 'EMAIL_NOT_FOUND' || data.error.message === 'INVALID_PASSWORD') {
                    throw new Error('Invalid email or password. Please try again.');
                } else {
                    throw new Error(data.error.message || 'Authentication failed');
                }
            }

            if (!isSignup) {
                localStorage.setItem('token', data.idToken);
                navigate('/home');
            } else {
                alert('User created successfully! Please log in.');
                navigate('/login');
            }
        } catch (error) {
            setError(error.message);
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
                        <div className="actions">
                            <Button type="submit" className="btn1">
                                {isSignup ? 'Sign Up' : 'Login'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    );
};

export default AuthForm;
