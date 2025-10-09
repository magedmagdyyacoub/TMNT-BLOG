import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Layout = styled.div`
  background-color: #0d0d0d;
  color: #00ffcc;
  min-height: 100vh;
  font-family: 'Orbitron', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
`;

const Username = styled.h1`
  font-size: 2.5rem;
  margin-top: 2rem;
  color: #00ffcc;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-top: 1rem;
  object-fit: cover;
`;

const Info = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ActionButton = styled.button`
  background-color: #00ffcc;
  color: #0d0d0d;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1rem;
`;

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:5000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data);
        setBio(res.data.bio || '');
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        setUser(null);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('bio', bio);
    if (avatarFile) formData.append('avatar', avatarFile);

    axios.put('http://localhost:5000/api/user/update-profile', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        alert('تم تحديث البيانات بنجاح!');
        setUser(prev => ({
          ...prev,
          bio,
          avatar: res.data.avatar || prev.avatar,
        }));
        setAvatarFile(null);
        setShowForm(false);
      })
      .catch(err => {
        console.error('Error updating profile:', err);
      });
  };



  return (
    <>
      <Header />
      <Layout>
        {user ? (
          <>
            <Avatar src={`http://localhost:5000${user.avatar || '/avatars/default.png'}`} />
            <Username>Welcome, {user.name}</Username>
            <Info>Bio: {user.bio || 'No bio yet.'}</Info>
            <Info>🍕 Pizza Count: {user.pizzacount}</Info>
            <Info>🎨 Fanart Count: {user.fanartcount}</Info>
            <Info>🏆 Score: {user.score}</Info>

            <ButtonRow>
              <ActionButton onClick={() => setShowForm(prev => !prev)}>
                {showForm ? 'Hide Edit' : 'Update Profile'}
              </ActionButton>
              <ActionButton onClick={() => navigate('/users')}>
  Add Friend
</ActionButton>
<ActionButton onClick={() => navigate('/friend-requests')}>
  View Requests
</ActionButton>
<ActionButton onClick={() => navigate('/my-friends')}>
  My Friends
</ActionButton>

            </ButtonRow>

            {showForm && (
              <Form onSubmit={handleSubmit}>
                <label>Update BIO</label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={4}
                  style={{ fontFamily: 'Orbitron', padding: '0.5rem' }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    setAvatarFile(e.target.files[0]);
                    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                {avatarPreview && <Avatar src={avatarPreview} alt="Avatar Preview" />}
                <ActionButton type="submit">Save Profile</ActionButton>
              </Form>
            )}
          </>
        ) : (
          <Username>Loading profile...</Username>
        )}
      </Layout>
      <Footer />
    </>
  );
}
