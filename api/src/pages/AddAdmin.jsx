import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AddAdmin() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem('token');
  const loggedInUserId = JSON.parse(atob(token.split('.')[1])).id; // Decode JWT to get ID

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/users?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const updateRole = async (id, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('User promoted to admin');
      fetchUsers();
    } catch (err) {
      alert('Failed to update role');
    }
  };

  const deleteUser = async (id) => {
    if (id === loggedInUserId) {
      alert("You cannot delete your own account.");
      return;
    }

    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('User deleted successfully');
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <>
      <Header />
      <div style={{ padding: '2rem', background: '#111', color: '#fff' }}>
        <h2 style={{ color: '#00ffcc' }}>👤 Manage Users</h2>
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#222' }}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ background: '#1a1a1a', textAlign: 'center' }}>
                <td style={styles.td}>{u.id}</td>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>
                  <span style={u.role === 'admin' ? styles.badgeAdmin : styles.badgeUser}>
                    {u.role}
                  </span>
                </td>
                <td style={styles.td}>
                  {u.role !== 'admin' && (
                    <button style={styles.button} onClick={() => updateRole(u.id, 'admin')}>
                      Promote to Admin
                    </button>
                  )}
                  <button style={styles.deleteBtn} onClick={() => deleteUser(u.id)}>
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ marginTop: '1rem' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                margin: '0 0.25rem',
                padding: '0.25rem 0.5rem',
                background: i + 1 === page ? '#00ffcc' : '#444',
                color: '#000',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  th: {
    padding: '0.75rem',
    borderBottom: '1px solid #333',
    color: '#00ffcc'
  },
  td: {
    padding: '0.5rem',
    borderBottom: '1px solid #222'
  },
  button: {
    padding: '0.3rem 0.75rem',
    backgroundColor: '#00ffcc',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem'
  },
  deleteBtn: {
    padding: '0.3rem 0.75rem',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  badgeAdmin: {
    backgroundColor: '#00ffcc',
    color: '#000',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px'
  },
  badgeUser: {
    backgroundColor: '#888',
    color: '#000',
    padding: '0.2rem 0.5rem',
    borderRadius: '4px'
  }
};
