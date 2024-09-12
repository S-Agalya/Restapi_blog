import React from 'react';
import Login from './components/Auth/Login';    // Import Login page
import Register from './components/Auth/Register';// Import Register page
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    // <div>
    //   <h1>Welcome to the Blog</h1>
    //   <Login /> 
      
    // </div>
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;

