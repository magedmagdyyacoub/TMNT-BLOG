import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminDashboard() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage('Access denied'));
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: '2rem', color: '#00ffcc', background: '#111' }}>
        <h1>{message}</h1>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={() => navigate('/admin/posts')}
            style={styles.button}
          >
            ➕ Add Post
          </button>

          <button
            onClick={() => navigate('/admin/myposts')}
            style={styles.button}
          >
            🧾 My Posts
          </button>

          <button
            onClick={() => navigate('/admin/add-admin')}
            style={styles.button}
          >
            👤➕ Add Admin
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#00ffcc',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};
