import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import '../styles/login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginUser({ email, password });
      const user = response.data.user;

      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'doctor') {
        navigate('/doctor');
      } else if (user.role === 'patient') {
        navigate('/patient');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Wystąpił błąd podczas logowania');
    }
  };

  return (
    <div className="login-container">
      <h1>Logowanie</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">zaloguj się</button>
      </form>
      <p>
        Nie masz konta? <button onClick={() => navigate('/register')}>zarejestruj się</button>
      </p>
    </div>
  );
};

export default LoginPage;
