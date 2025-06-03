import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import UserDetails from './pages/UserDetails';
import AddUserForm from './components/users/AddUserForm';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PatientPage from './pages/PatientPage';
import DoctorPage from './pages/DoctorPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users/:id" element={<UserDetails />} />
        <Route path="/admin/users/add" element={<AddUserForm />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;