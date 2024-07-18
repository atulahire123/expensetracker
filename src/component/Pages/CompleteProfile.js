import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './CompleteProfile.css';

const CompleteProfile = () => {
  const fullnameRef = useRef();
  const linkRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GetUserData();
  }, []);

  const updateHandler = async (event) => {
    event.preventDefault();

    const fullname = fullnameRef.current.value;
    const photolink = linkRef.current.value;

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18';
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: fullname,
          photoUrl: photolink,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      navigate('/home');
      console.log(data);
    } catch (error) {
      console.log(error);
      setError('Failed to update profile');
    }
  };

  const GetUserData = async () => {
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.users[0];
        if (user) {
          if (fullnameRef.current) {
            fullnameRef.current.value = user.displayName || '';
          }
          if (linkRef.current) {
            linkRef.current.value = user.photoUrl || '';
          }
        }
      } else {
        console.log('Failed to retrieve data', response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="top-message">
        Your Profile is <span className="highlight">64%</span> completed. A complete profile has higher chances of landing a job.
        <button className="btn-link">Complete now</button>
      </h2>
      <h3 className="headers">Complete Your Profile</h3>
      <div className="card">
        <h2>Contact Details</h2>
        <form onSubmit={updateHandler}>
          <div className="form-control">
            <label>Full Name:</label>
            <input type="text" placeholder="Full Name" ref={fullnameRef} />
          </div>
          <div className="form-control">
            <label>Profile Photo URL:</label>
            <input type="url" placeholder="Profile Photo URL" ref={linkRef} />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="actions">
            <button className="btn1" type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </button>
            <button className="btn2" type="button" onClick={() => navigate('/home')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
