import { useState } from 'react';
import axios from 'axios';

export default function PostForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('excerpt', excerpt);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/admin/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setTitle('');
      setExcerpt('');
      setImage(null);
      setPreview(null);
      onSuccess();
    } catch (err) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <div style={styles.error}>{error}</div>}

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Post Title"
        required
        style={styles.input}
      />

      <input
        value={excerpt}
        onChange={e => setExcerpt(e.target.value)}
        placeholder="Short Excerpt"
        style={styles.input}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={styles.fileInput}
      />

      {preview && (
        <img src={preview} alt="Preview" style={styles.previewImage} />
      )}

      <button type="submit" style={styles.button}>Publish Post</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    color: '#fff'
  },
  input: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#222',
    color: '#00ffcc',
    fontSize: '1rem'
  },
  fileInput: {
    padding: '0.5rem',
    background: '#000',
    color: '#00ffcc',
    border: '1px solid #444',
    borderRadius: '6px'
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '8px',
    marginTop: '0.5rem',
    objectFit: 'cover',
    border: '1px solid #444'
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#00ffcc',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  error: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    padding: '0.75rem',
    borderRadius: '6px'
  }
};
