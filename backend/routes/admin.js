const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminOnly');

// ✅ GET /api/admin/users (paginated)
router.get('/users', authMiddleware, adminOnly, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    const usersRes = await pool.query(
      'SELECT id, name, email, role FROM users ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const countRes = await pool.query('SELECT COUNT(*) FROM users');

    res.json({
      users: usersRes.rows,
      total: parseInt(countRes.rows[0].count),
      page,
      totalPages: Math.ceil(countRes.rows[0].count / limit)
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ PUT /api/admin/users/:id/role
router.put('/users/:id/role', authMiddleware, adminOnly, async (req, res) => {
  const { role } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role',
      [role, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});
// ✅ DELETE /api/admin/users/:id
router.delete('/users/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deleting themselves
    if (req.user.id == userId) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while deleting user' });
  }
});

module.exports = router;
