// src/component/Pages/CompleteProfile.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Adjust the path if your firebase.js file is in a different directory
import { updateProfile } from 'firebase/auth';
import './CompleteProfile.css';

const CompleteProfile = () => {
  const [fullName, setFullName] = useState('');
  const [profilePhotoURL, setProfilePhotoURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    setIsLoading(true);
    const user = auth.currentUser;

    try {
      await updateProfile(user, {
        displayName: fullName,
        photoURL: profilePhotoURL,
      });
      alert('Profile updated successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="top-message">
        Your Profile is <span className="highlight">64%</span> completed. A complete profile has higher chances of landing a job.
        <button className="btn-link">Complete now</button>
      </h2>
      <h3 className="headers">Winners never quit, Quitters never win.</h3>
      <div className="card">
        <h2>Contact Details</h2>
        <div className="form-control">
          <label><i className="fab fa-github"></i> Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label><i className="fas fa-globe"></i> Profile Photo URL:</label>
          <input
            type="text"
            value={profilePhotoURL}
            onChange={(e) => setProfilePhotoURL(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div>
          <button className="btn1" onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update'}
          </button>
          <button className="btn2" onClick={() => window.location.reload()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
