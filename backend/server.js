require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/user');
const adminPostsRoutes = require('./routes/adminPosts');
const adminRoutes = require('./routes/admin');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin/posts', adminPostsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
