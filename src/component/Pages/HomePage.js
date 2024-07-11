import React, { useState, useEffect, useContext } from 'react';
import CompleteProfile from './CompleteProfile';
import { AuthContext } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch profile data with token and check if profile is complete
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
        body: JSON.stringify({
          idToken: token,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.users[0];
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

  const handleCompleteProfileClick = () => {
    setShowCompleteProfile(true);
  };

  return (
    <div className="homepage-container">
      <h3 className="header">Welcome to Expense Tracker!!!</h3>
      {!showCompleteProfile && (
        <div className="profile-message">
          <p>
            Your profile is incomplete.{' '}
            <button onClick={handleCompleteProfileClick} className="btn-link">
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
