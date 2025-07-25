const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all public posts with author info
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const result = await pool.query(`
      SELECT posts.*, users.name AS author_name
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    res.json({ posts: result.rows });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single post by ID
// routes/posts.js

router.get('/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await pool.query(`
      SELECT 
        posts.*, 
        users.name AS user_name
      FROM posts
      JOIN users ON users.id = posts.user_id
      WHERE posts.id = $1
    `, [postId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching post detail:', err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});


module.exports = router;
