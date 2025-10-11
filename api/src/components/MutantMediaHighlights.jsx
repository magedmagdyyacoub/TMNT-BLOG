import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import leftIcon from '../assets/l.png';
import rightIcon from '../assets/R.png';
import { useNavigate } from 'react-router-dom';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  img {
    height: 60px;
    width: 60px;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neonGreen};
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.neonGreen};
  text-align: center;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.5rem;
  padding: 0 1.5rem;
`;

const PostCard = styled.a`
  background: #1f1f1f;
  border: 2px solid ${({ theme }) => theme.colors.neonOrange};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.neonOrange};

  &:hover {
    transform: perspective(800px) rotateY(2deg) scale(1.02);
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.neonGreen};
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const PostContent = styled.div`
  padding: 1rem;
`;

const PostTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.neonGreen};
`;

const PostExcerpt = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const NeonLetter = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  animation: glow 1.5s ease-in-out infinite alternate;
  color: ${({ color }) => color};
  text-shadow: 0 0 5px ${({ color }) => color}, 0 0 10px ${({ color }) => color}, 0 0 20px ${({ color }) => color};

  @keyframes glow {
    0% {
      transform: translateY(0);
      opacity: 0.8;
    }
    100% {
      transform: translateY(-5px);
      opacity: 1;
    }
  }
`;

const SideLetters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
`;

const MutantMediaHighlights = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const neonColors = ['#39ff14', '#ff073a', '#00ffff', '#ffa500'];

  const fetchPosts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts?page=${page}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const NeonSides = () => (
    <SideLetters>
      {'TMNT'.split('').map((char, idx) => (
        <NeonLetter key={idx} color={neonColors[idx % neonColors.length]}>
          {char}
        </NeonLetter>
      ))}
    </SideLetters>
  );

  return (
    <section className="py-12 bg-gray-900 text-white">
      <TitleWrapper>
        <NeonSides />
        <img src={leftIcon} alt="Left" />
        <Title>Mutant Media Highlights</Title>
        <img src={rightIcon} alt="Right" />
        <NeonSides />
      </TitleWrapper>

      <CardGrid>
        {posts.map((post) => (
          <PostCard key={post.id} href={`/posts/${post.id}`}>
            <PostImage src={`http://localhost:5000${post.image_url}`} alt={post.title} />

            <PostContent>
              <PostTitle>{post.title}</PostTitle>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
                by {post.author_name}
              </p>
            </PostContent>
          </PostCard>
        ))}
      </CardGrid>

      {/* Load More Button */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{
            padding: '0.5rem 1rem',
            background: '#00ffcc',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Load More
        </button>
      </div>
    </section>
  );
};

export default MutantMediaHighlights;
