import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../services/api';
import '../styles/admin.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/'); 
  };

  return (
    <div className="admin-container">
      <h1>Lista użytkowników</h1>
      
      <table className="users-table">
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Email</th>
            <th>Rola</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button 
                  onClick={() => handleDelete(user.id)}
                  className="delete-btn"
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-actions">
        <h2>Dodaj lekarza</h2>
        {/* TODO */}
        
        <button 
          onClick={handleLogout}
          className="logout-btn"
        >
          Wyloguj się
        </button>
      </div>
      <div className="action-buttons">
        <button onClick={() => window.location.reload()} className="refresh-btn">
            Odśwież dane
        </button>
            <Link to="/admin/users/add" className="add-user-btn">
            Dodaj nowego użytkownika
            </Link>
        </div>
    </div>
  );
};

export default AdminPage;