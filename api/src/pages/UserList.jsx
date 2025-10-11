import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

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

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const UserCard = styled.div`
  text-align: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background-color: #00ffcc;
  color: #0d0d0d;
  border: none;
  cursor: pointer;
`;

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/user/all?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(prev => [...prev, ...res.data]);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleAddFriend = async (receiverId, receiverName) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(`http://localhost:5000/api/user/add-friend/${receiverId}`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert(`✅ Friend request sent to ${receiverName}`);
  } catch (error) {
    console.error('Error sending friend request:', error);
    alert('❌ Failed to send request');
  }
};

  return (
    <>
      <Header />
      <Layout>
        <h2>🧑‍🤝‍🧑 Find Friends</h2>
        <UserGrid>
          {users.map(user => (
            <UserCard key={user.id}>
              <Avatar src={`http://localhost:5000${user.avatar}`} />
              <p>{user.name}</p>
              <Button onClick={() => handleAddFriend(user.id, user.name)}>Add Friend</Button>

            </UserCard>
          ))}
        </UserGrid>
        <Button onClick={() => setPage(prev => prev + 1)}>More</Button>
      </Layout>
      <Footer />
    </>
  );
}
