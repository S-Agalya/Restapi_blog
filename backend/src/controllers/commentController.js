//Handlers for comment-related requests
// src/controllers/commentController.js

const db = require('../config/db');

// Create a new comment
exports.createComment = async (req, res) => {
  const { post_id, content } = req.body;
  const author_id = req.user.id;

  try {
    const newComment = await db.query(
      'INSERT INTO comments (post_id, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [post_id, content, author_id]
    );
    res.status(201).json(newComment.rows[0]);
  } catch (error) {
    console.error('Error creating comment:', error); 
    res.status(500).json({ message: 'Server error' });
  }
};

// Read all comments for a post
exports.getComments = async (req, res) => {

  const { post_id } = req.query;

  try {
    const comments = await db.query('SELECT * FROM comments WHERE post_id = $1', [post_id]);
    res.status(200).json(comments.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Read a single comment
exports.getCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await db.query('SELECT * FROM comments WHERE id = $1', [id]);
    if (comment.rows.length === 0) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(comment.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await db.query(
      'UPDATE comments SET content = $1 WHERE id = $2 RETURNING *',
      [content, id]
    );
    if (updatedComment.rows.length === 0) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(updatedComment.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await db.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
    if (deletedComment.rows.length === 0) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
