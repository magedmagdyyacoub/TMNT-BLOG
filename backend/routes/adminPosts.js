const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminOnly');
const multer = require('multer');
const path = require('path');

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ✅ GET all posts (for admin dashboard)
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all posts:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET only current admin’s posts
router.get('/myposts', authMiddleware, adminOnly, async (req, res) => {
  try {
    const adminId = req.user.id;

    const result = await pool.query(
      'SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC',
      [adminId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching admin posts:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST a new post with image and user_id
router.post(
  '/',
  authMiddleware,
  adminOnly,
  upload.single('image'),
  async (req, res) => {
    const { title, excerpt } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const user_id = req.user.id;

    try {
      const result = await pool.query(
        'INSERT INTO posts (title, excerpt, image_url, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, excerpt, image_url, user_id]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error creating post:', err);
      res.status(500).json({ error: err.message });
    }
  }
);
// PUT /api/admin/posts/:id
router.put('/:id', authMiddleware, adminOnly, upload.single('image'), async (req, res) => {
  const { title, excerpt } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Update with/without image
    const result = await pool.query(
      `
      UPDATE posts
      SET title = $1, excerpt = $2, image_url = COALESCE($3, image_url)
      WHERE id = $4 RETURNING *
      `,
      [title, excerpt, image_url, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});
// DELETE /api/admin/posts/:id
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// ✅ Serve uploaded images
router.use('/uploads', express.static('uploads'));

module.exports = router;
