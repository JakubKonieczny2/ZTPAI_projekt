import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users
export const fetchUsers = () => api.get('users/');
export const fetchUser = (id) => api.get(`users/${id}/`);
export const deleteUser = (id) => api.delete(`users/${id}/`);
export const createUser = (data) => api.post('users/', data);
export const createDoctor = (data) => api.post('doctors/', data);
export const refreshUsers = () => api.get('users/');

// Appointments
export const fetchAppointments = () => api.get('appointments/');

export const updateAppointment = (id, data) => api.patch(`appointments/${id}/`, data);
export const createAppointment = (data) => api.post('appointments/', data);

// Authentication
export const loginUser = (data) => api.post('login/', data);

export default api;
