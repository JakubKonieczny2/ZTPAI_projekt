import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAppointments, updateAppointment } from '../services/api';
import '../styles/patient.css';

const PatientPage = () => {
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [reservedAppointments, setReservedAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await fetchAppointments();
        const available = response.data.filter(app => app.status.toUpperCase() === 'AVAILABLE');
        const reserved = response.data.filter(app => app.status.toUpperCase() === 'RESERVED');
        setAvailableAppointments(available);
        setReservedAppointments(reserved);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    getAppointments();
  }, []);

  const userId = Number(localStorage.getItem('userId'));
  
  const handleReserve = async (appointmentId) => {
    try {
    await updateAppointment(appointmentId, { status: 'RESERVED', patient: userId });
    window.location.reload();
  } catch (error) {
    console.error('Error reserving appointment:', error);
  }
};

  const handleCancel = async (appointmentId) => {
    try {
    await updateAppointment(appointmentId, { status: 'AVAILABLE', patient: null });
    window.location.reload();
  } catch (error) {
    console.error('Error canceling appointment:', error);
  }
};

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="patient-container">
      <h1>Dostępne wizyty</h1>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Lekarz</th>
            <th>Specjalizacja</th>
            <th>Data</th>
            <th>Godzina</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {availableAppointments.map(app => (
            <tr key={app.id}>
              <td>{app.doctor.user.first_name} {app.doctor.user.last_name}</td>
              <td>{app.doctor.specialization}</td>
              <td>{app.appointment_date}</td>
              <td>{app.appointment_time}</td>
              <td>
                <button onClick={() => handleReserve(app.id)}>Rezerwuj</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Moje zarezerwowane wizyty</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Lekarz</th>
            <th>Specjalizacja</th>
            <th>Data</th>
            <th>Godzina</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {reservedAppointments.map(app => (
            <tr key={app.id}>
              <td>{app.doctor.user.first_name} {app.doctor.user.last_name}</td>
              <td>{app.doctor.specialization}</td>
              <td>{app.appointment_date}</td>
              <td>{app.appointment_time}</td>
              <td>
                <button onClick={() => handleCancel(app.id)}>Rezygnuj</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="logout-btn" onClick={handleLogout}>Wyloguj się</button>
    </div>
  );
};

export default PatientPage;
