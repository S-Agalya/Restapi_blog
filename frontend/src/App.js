import React from 'react';
import Login from './components/Auth/Login';    // Import Login page
import Register from './components/Auth/Register';// Import Register page

const App = () => {
  return (
    <div>
      <h1>Welcome to the Blog</h1>
      <Register />  
    </div>
  );
};

export default App;

