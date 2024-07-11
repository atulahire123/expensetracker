// src/component/Pages/HomePage.js
import React, { useState } from 'react';
import CompleteProfile from './CompleteProfile';
import './HomePage.css';

const HomePage = () => {
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);

  const handleCompleteProfileClick = () => {
    setShowCompleteProfile(true);
  };

  return (
    <div className="homepage-container">
      <h3 className="header">Welcome to Expense Tracker!!!</h3>
      {!showCompleteProfile && (
        <div className="profile-message">
          <p>Your profile is incomplete. <button onClick={handleCompleteProfileClick} className="btn-link">Complete now</button></p>
        </div>
      )}
      {showCompleteProfile && <CompleteProfile />}
    </div>
  );
};

export default HomePage;
