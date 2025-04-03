import axios from 'axios';

const api = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Users
export const fetchUsers = () => api.get('users/');
export const fetchUser = (id) => api.get(`users/${id}/`);
export const deleteUser = (id) => api.delete(`users/${id}/`);
export const createUser = (data) => api.post('users/', data);
export const createDoctor = (data) => api.post('doctors/', data);
export const refreshUsers = () => api.get('users/');

// Auth
export const login = (credentials) => api.post('auth/', credentials);
export const logout = () => api.post('logout/');

export default api;