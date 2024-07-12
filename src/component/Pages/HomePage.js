import React, { useState, useEffect, useContext } from 'react';
import CompleteProfile from './CompleteProfile';
import { AuthContext } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfileData(token);
    }
  }, []);

  const fetchProfileData = async (token) => {
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: token }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.users[0];
        setEmailVerified(user.emailVerified);
        if (!user.displayName || !user.photoUrl) {
          setShowCompleteProfile(true);
        }
      } else {
        console.log('Failed to fetch profile data.');
      }
    } catch (error) {
      console.log('Failed to fetch profile data.', error);
    }
  };

  const sendVerificationEmail = async () => {
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: authCtx.token,
        }),
      });

      if (response.ok) {
        setVerificationSent(true);
        alert('Verification email sent. Please check your inbox.');
      } else {
        console.log('Failed to send verification email.');
      }
    } catch (error) {
      console.log('Failed to send verification email.', error);
    }
  };

  return (
    <div className="homepage-container">
      <h3 className="header">Welcome to Expense Tracker!!!</h3>
      {!emailVerified && !verificationSent && (
        <div className="verification-message">
          <p>Your email is not verified. Please verify your email.</p>
          <button onClick={sendVerificationEmail} className="btn-link">
            Verify Email
          </button>
        </div>
      )}
      {verificationSent && <p>Verification email sent. Please check your inbox.</p>}
      {!showCompleteProfile && (
        <div className="profile-message">
          <p>
            Your profile is incomplete.{' '}
            <button onClick={() => setShowCompleteProfile(true)} className="btn-link">
              Complete now
            </button>
          </p>
        </div>
      )}
      {showCompleteProfile && <CompleteProfile />}
    </div>
  );
};

export default HomePage;
