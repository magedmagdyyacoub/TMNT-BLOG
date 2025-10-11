import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import styled from 'styled-components';
import loginImg from '../assets/img/2.png';
import Header from '../components/Header'; // Assuming you have a Header component
import Footer from '../components/Footer'; 

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  min-height: calc(100vh - 140px); 
  gap: 2rem;
  flex-wrap: wrap;
  padding: 2rem;
  
`;

const Image = styled.img`
  width: 400px;
  max-width: 90vw;
  border-radius: 12px;
  box-shadow: 0 0 25px ${({ theme }) => theme.colors.neonGreen};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Form = styled.form`
  background: #111;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 0 25px ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.white};
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-family: 'Orbitron', sans-serif;
    color: ${({ theme }) => theme.colors.neonGreen};
    text-align: center;
  }

  input, button {
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    font-family: inherit;
  }

  button {
    background: ${({ theme }) => theme.colors.neonGreen};
    color: black;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: ${({ theme }) => theme.colors.pink};
    }
  }
`;


  export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      const { token } = res.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      navigate(decoded.role === 'admin' ? '/admin' : '/user/profile');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  return (
    <>
      <Header />
    <Wrapper>
      <Image src={loginImg} alt="Login visual" />
    <Form onSubmit={handleSubmit}>
  <h2>Login</h2>
  <label>Email</label>
  <input type="email" name="email" value={form.email} onChange={handleChange} required />
  <label>Password</label>
  <input type="password" name="password" value={form.password} onChange={handleChange} required />
  <button type="submit">Login</button>
  <p style={{ textAlign: 'center', color: '#888' }}>
    Don't have an account? <a href="/register" style={{ color: '#0f0' }}>Register</a>
  </p>
  <p style={{ textAlign: 'center', color: '#888' }}>
    <a href="/forgot-password" style={{ color: '#0f0' }}>Forgot Password?</a>
  </p>
</Form>

    </Wrapper>
      <Footer />
    </>
  );
}
