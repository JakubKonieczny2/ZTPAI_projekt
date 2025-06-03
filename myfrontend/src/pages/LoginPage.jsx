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

      localStorage.setItem('userId', user.id);

      if (user.role && user.role.toLowerCase() === 'admin') {
        navigate('/admin');
      } else if (user.role && user.role.toLowerCase() === 'doctor') {
        navigate('/doctor');
      } else if (user.role && user.role.toLowerCase() === 'patient') {
        navigate('/patient');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Wystąpił błąd podczas logowania');
    }
  };

  return (
    <div className="login-container">
      <h2>Logowanie</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Zaloguj się</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div>
        Nie masz konta?
        <a href="/register">Zarejestruj się</a>
      </div>
    </div>
  );
};

export default LoginPage;
