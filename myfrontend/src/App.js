import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import UserDetails from './pages/UserDetails';
import AddUserForm from './components/users/AddUserForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users/:id" element={<UserDetails />} />
        <Route path="/admin/users/add" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
}

export default App;