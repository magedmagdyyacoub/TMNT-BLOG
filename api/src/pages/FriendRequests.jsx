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

const RequestCard = styled.div`
  text-align: center;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #00ffcc;
  border-radius: 6px;
  max-width: 220px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background-color: #00ffcc;
  color: #0d0d0d;
  border: none;
  padding: 0.4rem 0.8rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
`;

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/user/friend-requests', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRequests(res.data);
  };

  const respondToRequest = async (id, status) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/user/friend-requests/${id}/respond`, 
      { status }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRequests(prev => prev.filter(r => r.id !== id)); // Remove request from UI
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <Header />
      <Layout>
        <h2>🧾 Friend Requests</h2>
        {requests.length === 0 ? (
          <p>No pending friend requests.</p>
        ) : (
          requests.map(req => (
            <RequestCard key={`req-${req.id}`}>

              <Avatar src={`http://localhost:5000${req.avatar}`} />
              <p>{req.name}</p>
              <ButtonGroup>
                <ActionButton onClick={() => respondToRequest(req.id, 'accepted')}>Accept</ActionButton>
                <ActionButton onClick={() => respondToRequest(req.id, 'declined')}>Decline</ActionButton>
              </ButtonGroup>
            </RequestCard>
          ))
        )}
      </Layout>
      <Footer />
    </>
  );
}
