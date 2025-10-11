import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = styled.div`
  background-color: #0d0d0d;
  color: #00ffcc;
  min-height: 100vh;
  font-family: 'Orbitron', sans-serif;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FriendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FriendCard = styled.div`
  text-align: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export default function MyFriends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/user/friends', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setFriends(res.data));
  }, []);

  return (
    <>
      <Header />
      <Layout>
        <h2>👥 My Friends</h2>
        {friends.length === 0 ? (
          <p>You don't have friends yet 😔</p>
        ) : (
          <FriendGrid>
            {friends.map(friend => (
              <FriendCard key={`friend-${friend.id}`}>
                <Avatar src={`http://localhost:5000${friend.avatar}`} />
                <p>{friend.name}</p>
              </FriendCard>
            ))}
          </FriendGrid>
        )}
      </Layout>
      <Footer />
    </>
  );
}
