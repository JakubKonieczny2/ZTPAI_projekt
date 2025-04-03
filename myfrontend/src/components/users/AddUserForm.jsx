import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/api';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'patient'
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await createUser(formData);
      console.log('User created:', response.data); 
      navigate('/admin');
    } catch (err) {
      console.error('Creation error:', err.response?.data);
      setError(err.response?.data?.message || 'Wystąpił błąd podczas tworzenia użytkownika');
    }
  };

  return (
    <div className="user-form">
      <h2>Dodaj nowego użytkownika</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Imię:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Nazwisko:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Hasło:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Rola:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="patient">Pacjent</option>
            <option value="doctor">Lekarz</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Zapisz
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;