import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [createdAt, setCreatedAt] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !createdAt) {
      setError('Title, Content, and Date are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('tags', tags);
    formData.append('category', category);
    formData.append('featuredImage', featuredImage);
    formData.append('createdAt', createdAt);
    formData.append('content', content);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post('http://localhost:3000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Blog created:', response.data);
      navigate('/home');
    } catch (err) {
      setError('Error creating blog');
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Tags (comma-separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Featured Image */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Featured Image:</label>
          <input
            type="file"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
            className="mt-2"
          />
        </div>

        {/* Created At */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Created At:</label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            required
            className="mt-2 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="5"
            className="mt-2 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;



