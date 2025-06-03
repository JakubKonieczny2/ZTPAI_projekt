import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, createDoctor } from '../../services/api';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'patient'
  });
  const [specialization, setSpecialization] = useState('');
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
      const user = response.data.data || response.data;
      if (formData.role === 'doctor') {
        if (!specialization) {
          setError('Specjalizacja jest wymagana dla lekarza');
          return;
        }
        await createDoctor({ user: user.id, specialization });
      }
      navigate('/admin');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.details?.email?.[0] ||
        'Wystąpił błąd podczas tworzenia użytkownika'
      );
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
            onChange={e => {
              handleChange(e);
              if (e.target.value !== 'doctor') setSpecialization('');
            }}
          >
            <option value="patient">Pacjent</option>
            <option value="doctor">Lekarz</option>
          </select>
        </div>
        {formData.role === 'doctor' && (
          <div className="form-group">
            <label>Specjalizacja:</label>
            <input
              type="text"
              name="specialization"
              value={specialization}
              onChange={e => setSpecialization(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Zapisz
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;