import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBlog.css'; // Import custom CSS file for additional styling

const EditBlog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing blog details to prefill the form
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        const { title, content, tags, category, featured_image, created_at } = response.data;
        setTitle(title);
        setTags(tags);
        setCategory(category);
        setContent(content);
        setFeaturedImage(featured_image); // Assuming this is the image URL
        setCreatedAt(created_at);
      } catch (error) {
        console.error('Error fetching the blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!title || !content) {
      setError('Title and Content are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('tags', tags);
    formData.append('category', category);
    formData.append('featured_image', featuredImage); // Image file or URL
    formData.append('content', content);

    try {
      // Send the PUT request to update the blog
      const response = await axios.put(`http://localhost:3000/api/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Blog updated:', response.data);
      // Redirect to Home after successful update
      navigate('/home');
    } catch (err) {
      setError('Error updating blog');
      console.error(err);
    }
  };

  return (
    <div className="edit-blog-container">
      <h2 className="text-center text-primary mb-4">Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Tags (comma-separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Featured Image:</label>
          <input
            type="file"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
            className="form-control-file"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="5"
            className="form-control"
          />
        </div>

        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;



