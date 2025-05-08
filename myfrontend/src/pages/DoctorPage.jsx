import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAppointments } from '../services/api';
import '../styles/patient.css';

const DoctorPage = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await fetchAppointments();
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    getAppointments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="patient-container">
      <h1>Moje terminy</h1>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Godzina</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id}>
              <td>{app.appointment_date}</td>
              <td>{app.appointment_time}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout} className="logout-btn">wyloguj się</button>
    </div>
  );
};

export default DoctorPage;
