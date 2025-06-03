import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';
import '../styles/login.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'patient',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createUser(formData);
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.details?.email?.[0] ||
        err.response?.data?.error ||
        'Wystąpił błąd podczas rejestracji'
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Rejestracja</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="Imię"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Nazwisko"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Zarejestruj się</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div>
        Masz już konto?
        <a href="/login">Zaloguj się</a>
      </div>
    </div>
  );
};

export default RegisterPage;
