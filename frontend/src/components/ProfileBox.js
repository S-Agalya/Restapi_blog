// ProfileBox.js
// ProfileBox.js
import React from 'react';
import './ProfileBox.css'; // Add styles if needed

const ProfileBox = ({ user, onClose }) => {
  console.log('ProfileBox user data:', user); // Debugging line

  return (
    <div className="profile-box">
      <button className="close-btn" onClick={onClose}>X</button>
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Password:</strong> {user.password}</p> {/* Handle passwords securely */}
    </div>
  );
};

export default ProfileBox;
