import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser } from '../services/api';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchUser(id);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/admin');
      }
    };
    getUser();
  }, [id, navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-details">
      <h1>Szczegóły użytkownika</h1>
      <div className="detail-item">
        <span>Imię:</span> {user.first_name}
      </div>
      <div className="detail-item">
        <span>Nazwisko:</span> {user.last_name}
      </div>
      <div className="detail-item">
        <span>Email:</span> {user.email}
      </div>
      <div className="detail-item">
        <span>Rola:</span> {user.role}
      </div>
      {user.role === 'doctor' && (
        <div className="detail-item">
          <span>Specjalizacja:</span> {user.doctor?.specialization}
        </div>
      )}
      <button onClick={() => navigate('/admin')} className="back-btn">
        Powrót
      </button>
    </div>
  );
};

export default UserDetails;