import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostList from '../components/PostList';

export default function AdminMyPosts() {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/posts/myposts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch my posts');
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: '2rem', background: '#111', color: '#00ffcc' }}>
        <h1>🧾 My Posts</h1>
        <PostList posts={posts} onDelete={fetchMyPosts} onEdit={fetchMyPosts} />
      </div>
      <Footer />
    </>
  );
}
