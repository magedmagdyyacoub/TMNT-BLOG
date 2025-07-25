const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminOnly');
const db = require('../db');


router.post('/register', auth.register);
router.post('/login', auth.login);

router.get('/user/profile', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, name, avatar, bio, pizzacount, fanartcount, score FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});



router.get('/admin/dashboard', authMiddleware, adminOnly, (req, res) => {
  res.json({ message: 'Welcome admin!' });
});

module.exports = router;
