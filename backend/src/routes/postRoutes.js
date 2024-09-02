//define API routes
// src/routes/postRoutes.js

const express = require('express');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a post (protected route)
router.post('/', authenticateToken, createPost);

// Read all posts
router.get('/', getPosts);

// Read a single post
router.get('/:id', getPostById);

// Update a post (protected route)
router.put('/:id', authenticateToken, updatePost);

// Delete a post (protected route)
router.delete('/:id', authenticateToken, deletePost);

module.exports = router;
