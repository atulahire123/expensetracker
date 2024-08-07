import React, { useRef, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import './CompleteProfile.css';

const CompleteProfile = () => {
  const nameRef = useRef();
  const photoUrlRef = useRef();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredPhotoUrl = photoUrlRef.current.value;
    const token = localStorage.getItem('token')
    console.log(token)
    setIsLoading(true);

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18', {
        method: 'POST',
        body: JSON.stringify({
          idToken:token,
          displayName: enteredName,
          photoUrl: enteredPhotoUrl,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update profile.');
      }

      const data = await response.json();
      alert('Profile updated successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="complete-profile">
      <h2 className="text-center mb-4">Complete Your Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" ref={nameRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="photoUrl">
          <Form.Label>Profile Photo URL</Form.Label>
          <Form.Control type="text" ref={photoUrlRef} />
        </Form.Group>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Update Profile'}
        </Button>
      </Form>
    </section>
  );
};

export default CompleteProfile;
