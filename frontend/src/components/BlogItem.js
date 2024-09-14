import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogItem = ({ blog, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-blog/${blog.id}`);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
      <p className="text-gray-700 mb-4">{blog.content}</p>
      <div className="d-flex justify-between">
        <button
          onClick={handleEdit}
          className="btn btn-primary"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(blog.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogItem;

