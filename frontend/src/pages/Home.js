import React, { useState, useEffect } from 'react';
import BlogList from '../components/BlogList';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileBox from '../components/ProfileBox'; // Import ProfileBox
import './Home.css'; // Import the updated CSS file

const Home = () => {
  const location = useLocation();
  const { username, email, password } = location.state || {}; // Get user details from location state
  const [blogs, setBlogs] = useState([]);
  const [showProfile, setShowProfile] = useState(false); // State to control ProfileBox visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch blogs from the backend
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    // Handle blog deletion
    setBlogs(blogs.filter((blog) => blog.id !== id));
    // Call an API to delete the blog
    axios.delete(`http://localhost:3000/api/posts/${id}`).catch(console.error);
  };

  const toggleCreateBlog = () => {
    navigate('/create-blog');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:3001'; // Redirect to the homepage
  };

  const toggleProfileBox = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-buttons">
          <button
            onClick={toggleCreateBlog}
            className="btn btn-create"
          >
            Create Blog
          </button>
          <button
            onClick={toggleProfileBox} // Toggle ProfileBox visibility
            className="btn btn-profile"
          >
            Profile
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-logout"
        >
          Logout
        </button>
      </nav>
      
      {/* Main Content Section */}
      <main className="main-content">
        {/* Welcome message at the top */}
        <h1 className="welcome-message">
          Welcome {username || 'Guest'}!
        </h1>
        
        {/* Blog List */}
        <div className="blog-list">
          <BlogList blogs={blogs} onDelete={handleDelete} />
        </div>

        {/* Conditional rendering of ProfileBox */}
        {showProfile && (
          <ProfileBox
            user={{ username, email, password }}
            onClose={toggleProfileBox} // Close ProfileBox
          />
        )}
      </main>
    </div>
  );
};

export default Home;







