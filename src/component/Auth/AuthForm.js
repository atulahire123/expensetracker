import React, { useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import './AuthForm.css';

const AuthForm = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPassRef.current.value;

        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSKfkH8qKA01VSPg6TCAfi9fKEQvjQOs8';

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

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message || 'Authentication failed');
            }

            const data = await response.json();
            console.log('Authentication successful:', data);

        } catch (error) {
            console.error('Error during authentication:', error.message);
        }
    };

    return (
        <section className="d-flex align-items-center justify-content-center mt-5">
            <Card className="card">
                <Card.Body>
                    <Card.Title className="text-center">Sign Up</Card.Title>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" ref={confirmPassRef} />
                        </Form.Group>

                        <div className="actions">
                            <Button type="submit" className="btn1">
                                Sign Up
                            </Button>

                            <Button className="btn2" style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }}>
                                Have an account? Login
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    );
};

export default AuthForm;
