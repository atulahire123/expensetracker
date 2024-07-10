import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import './AuthForm.css';

const AuthForm = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        let url;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSKfkH8qKA01VSPg6TCAfi9fKEQvjQOs8';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSKfkH8qKA01VSPg6TCAfi9fKEQvjQOs8';
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error.message || 'Authentication failed');
            }

            if (isLogin) {
                localStorage.setItem('token', data.idToken);
                navigate('/home');
            } else {
                alert('User created successfully! Please log in.');
                setIsLogin(true);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const forgotPasswordHandler = () => {
        const email = emailRef.current.value;
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCSKfkH8qKA01VSPg6TCAfi9fKEQvjQOs8';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error.message);
            }
            alert('Password reset email sent!');
        })
        .catch(err => {
            setError(err.message);
        });
    };

    return (
        <section className="d-flex align-items-center justify-content-center mt-5">
            <Card className="card">
                <Card.Body>
                    <Card.Title className="text-center card-title">{isLogin ? 'Login' : 'Sign Up'}</Card.Title>
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
                                {isLogin ? 'Login' : 'Sign Up'}
                            </Button>
                            {isLogin && (
                                <div className="text-center">
                                    <a href="#" onClick={forgotPasswordHandler} className="forgot-password">
                                        Forgot password?
                                    </a>
                                </div>
                            )}
                            <Button
                                type="button"
                                className="btn2"
                                onClick={switchAuthModeHandler}
                            >
                                {isLogin ? 'Create new account' : 'Have an account? Login'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    );
};

export default AuthForm;
