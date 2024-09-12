import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const { username } = location.state || {}; // Get username from location state
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome {username ? username : 'Guest'}!</h1>
      <p>This is the home page.</p>
    </div>
  );
};

export default Home;



