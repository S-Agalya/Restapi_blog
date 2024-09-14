import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs, onDelete }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h2>{blog.title}</h2>
          <p>{blog.content.substring(0, 100)}...</p>

          {/* Edit Button */}
          <Link to={`/edit-blog/${blog.id}`}>
            <button>Edit</button>
          </Link>

          {/* Delete Button */}
          <button onClick={() => onDelete(blog.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
