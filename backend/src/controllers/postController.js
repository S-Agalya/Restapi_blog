// logic for handling api requests
//Handlers for post-related requests

// src/controllers/postController.js

const db = require('../config/db');

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, tags, category, featured_image } = req.body;
  const author_id = req.user.id;

  try {
    const newPost = await db.query(
      'INSERT INTO posts (title, content, author_id, tags, category, featured_image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, content, author_id, tags, category, featured_image]
    );
    res.status(201).json(newPost.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Read all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await db.query('SELECT * FROM posts');
    res.status(200).json(posts.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Read a single post
exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (post.rows.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, category, featured_image } = req.body;

  try {
    const updatedPost = await db.query(
      'UPDATE posts SET title = $1, content = $2, tags = $3, category = $4, featured_image = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [title, content, tags, category, featured_image, id]
    );
    if (updatedPost.rows.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(updatedPost.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    if (deletedPost.rows.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
