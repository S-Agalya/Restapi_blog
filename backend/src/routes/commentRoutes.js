// src/routes/commentRoutes.js

const express = require('express');
const {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a comment (protected route)
router.post('/', authenticateToken, createComment);

// Read comments for a post
router.get('/', getComments);

// Read a single comment
router.get('/:id', getCommentById);

// Update a comment (protected route)
router.put('/:id', authenticateToken, updateComment);

// Delete a comment (protected route)
router.delete('/:id', authenticateToken, deleteComment);

module.exports = router;
