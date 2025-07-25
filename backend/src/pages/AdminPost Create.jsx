import Header from '../components/Header';
import Footer from '../components/Footer';
import PostForm from '../components/PostForm';

export default function AdminPostCreate() {
  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.heading}>📝 Create New Post</h2>
          <p style={styles.subtitle}>Fill in the fields below to publish a new post.</p>
          <hr style={styles.divider} />
          <PostForm onSuccess={() => window.location.href = '/admin'} />
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    backgroundColor: '#111',
    color: '#00ffcc',
    padding: '4rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#1c1c1c',
    padding: '2rem',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 0 12px rgba(0, 255, 204, 0.2)',
  },
  heading: {
    marginBottom: '0.5rem',
    fontSize: '2rem',
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: '1.5rem',
    fontSize: '1rem',
    textAlign: 'center',
    color: '#ccc',
  },
  divider: {
    borderColor: '#00ffcc',
    marginBottom: '1.5rem',
  }
};
