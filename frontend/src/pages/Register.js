import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Admin Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} required />
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
      </form>
    </Container>
  );
}

export default Register;
