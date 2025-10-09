const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');


// POST a comment with optional emoji
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { limit = 3, offset = 0 } = req.query;

  try {
    const result = await pool.query(`
      SELECT c.*, u.name, u.avatar
      FROM comments c
      JOIN users u ON u.id = c.user_id
      WHERE c.post_id = $1 AND c.parent_comment_id IS NULL
      ORDER BY c.created_at DESC
      LIMIT $2 OFFSET $3
    `, [postId, limit, offset]);

    // Fetch replies for each comment
    const commentsWithReplies = await Promise.all(result.rows.map(async comment => {
      const replies = await pool.query(`
        SELECT r.*, u.name, u.avatar
        FROM comments r
        JOIN users u ON u.id = r.user_id
        WHERE r.parent_comment_id = $1
        ORDER BY r.created_at ASC
        LIMIT 3
      `, [comment.id]);

      return { ...comment, replies: replies.rows };
    }));

    res.json(commentsWithReplies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load comments' });
  }
});

// GET all comments for a post
router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const result = await pool.query(`
      SELECT comments.*, users.name, users.avatar
      FROM comments
      JOIN users ON users.id = comments.user_id
      WHERE comments.post_id = $1
      ORDER BY comments.created_at DESC
    `, [postId]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load comments' });
  }
});

// React to a comment
router.post('/react/:commentId', authMiddleware, async (req, res) => {
  const { emoji } = req.body;
  const commentId = req.params.commentId;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO comment_reactions (comment_id, user_id, emoji) VALUES ($1, $2, $3) RETURNING *',
      [commentId, userId, emoji]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add reaction' });
  }
});
module.exports = router;
