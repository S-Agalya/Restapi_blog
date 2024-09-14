import React from 'react';
import Login from './components/Auth/Login';    // Import Login page
import Register from './components/Auth/Register';// Import Register page
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path='/create-blog' element={<CreateBlog/>}/>
      <Route path="/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;

