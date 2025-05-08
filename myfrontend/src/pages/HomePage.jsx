import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>System rezerwacji wizyt u lekarza</h1>
      <div className="button-container">
        <button className="home-button" onClick={() => navigate('/login')}>
          Zaloguj się
        </button>
        <button className="home-button" onClick={() => navigate('/register')}>
          Zarejestruj się
        </button>
      </div>
    </div>
  );
};

export default HomePage;
