import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostComments from '../components/PostComments';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Container = styled.div`
  background: #111;
  color: #fff;
  min-height: 100vh;
  padding: 2rem;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 10px #00ffcc;
`;

const Title = styled.h1`
  color: #00ffcc;
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Meta = styled.p`
  font-style: italic;
  color: #aaa;
  margin-bottom: 1rem;
`;

const Excerpt = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  padding: 2rem;
  text-align: center;
`;

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Failed to fetch post');
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();

    // Check login status
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (res.ok) setIsLoggedIn(true);
          else setIsLoggedIn(false);
        })
        .catch(() => setIsLoggedIn(false));
    }
  }, [id]);

  if (error) return <ErrorMessage>❌ {error}</ErrorMessage>;
  if (!post) return <p style={{ color: '#fff', padding: '2rem' }}>Loading...</p>;

  
  return (
    <>
      <Header />
      <Container>
        {post.image_url && (
          <Image src={`http://localhost:5000${post.image_url}`} alt={post.title} />
        )}
        <Title>{post.title}</Title>
        <Meta>
          Posted by <strong>{post.user_name || 'Unknown'}</strong> on{' '}
          {new Date(post.created_at).toLocaleDateString()}
        </Meta>
        <Excerpt>{post.excerpt}</Excerpt>

        <h2 style={{ color: '#ffcc00' }}>💬 Comments</h2>
        {isLoggedIn ? (
          <PostComments postId={id} />
          
        ) : (
          <div>
            <p style={{ color: '#aaa' }}>
              You must be logged in to write comments or add emoji reactions.
            </p>
            <PostComments postId={id} readOnly />
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}
