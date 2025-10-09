const express = require('express');
const router = express.Router();
const pool = require('../db');
const path = require('path');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');

// إعداد التخزين للصورة الرمزية
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/avatars'),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
});

const upload = multer({ storage });

/**
 * GET /api/user/profile
 * إرجاع بيانات المستخدم: الاسم، الصورة، البايو، الإحصائيات
 */
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    console.log('✅ Decoded token:', req.user); // Debug token
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT id, name, avatar, bio, pizzacount, fanartcount, score
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // إضافة صورة افتراضية لو مفيش
    if (!user.avatar) {
      user.avatar = '/avatars/default.png';
    }

    res.json(user);
  } catch (err) {
    console.error('🔥 Error in /profile route:', err.message);
    console.error('📛 Full error object:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

/**
 * PUT /api/user/update-profile
 * لتحديث صورة المستخدم والبايو
 */
router.put('/update-profile', authMiddleware, upload.single('avatar'), async (req, res) => {
  const { bio } = req.body;
  let avatarPath;

  if (req.file) {
    avatarPath = `/avatars/${req.file.filename}`;
  }

  try {
    let query = 'UPDATE users SET bio = $1';
    const values = [bio];

    if (avatarPath) {
      query += ', avatar = $2';
      values.push(avatarPath);
    }

    const userIdParamPosition = values.length + 1;
    query += ` WHERE id = $${userIdParamPosition}`;
    values.push(req.user.id);

    await pool.query(query, values);

    res.json({
      message: '✅ Profile updated successfully',
      avatar: avatarPath,
      bio,
    });
  } catch (err) {
    console.error('🔥 Error updating profile:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.get('/all', authMiddleware, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 9;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      `SELECT id, name, avatar FROM users ORDER BY id LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('🔥 Error fetching users:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});
router.post('/add-friend/:id', authMiddleware, async (req, res) => {
  const senderId = req.user.id;
  const receiverId = parseInt(req.params.id);

  try {
    await pool.query(
      `INSERT INTO friend_requests (sender_id, receiver_id) VALUES ($1, $2)`,
      [senderId, receiverId]
    );
    res.json({ message: 'Friend request sent!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/friend-requests', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT fr.id, u.name, u.avatar
       FROM friend_requests fr
       JOIN users u ON fr.sender_id = u.id
       WHERE fr.receiver_id = $1 AND fr.status = 'pending'`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put('/friend-requests/:id/respond', authMiddleware, async (req, res) => {
  const { status } = req.body; // 'accepted' or 'declined'
  const requestId = req.params.id;

  try {
    await pool.query(
      `UPDATE friend_requests SET status = $1 WHERE id = $2`,
      [status, requestId]
    );
    res.json({ message: `Request ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/friends', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT u.id, u.name, u.avatar
       FROM friend_requests fr
       JOIN users u ON u.id = fr.sender_id
       WHERE fr.receiver_id = $1 AND fr.status = 'accepted'
       UNION
       SELECT u.id, u.name, u.avatar
       FROM friend_requests fr
       JOIN users u ON u.id = fr.receiver_id
       WHERE fr.sender_id = $1 AND fr.status = 'accepted'`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching friends:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
