import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default api;

// Event CRUD
export async function getEvents() {
  const res = await api.get('/events');
  return res.data;
}

export async function getAdminEvents() {
  const res = await api.get('/events/admin/melodyadmin');
  return res.data;
}

export async function getUpcomingAdminEvents() {
  const res = await api.get('/events/admin/melodyadmin/upcoming');
  return res.data;
}

export async function getPastAdminEvents() {
  const res = await api.get('/events/admin/melodyadmin/past');
  return res.data;
}

export async function addEvent(data) {
  const res = await api.post('/events', data);
  return res.data;
}

export async function updateEvent(id, data) {
  const res = await api.put(`/events/${id}`, data);
  return res.data;
}

export async function deleteEvent(id) {
  const res = await api.delete(`/events/${id}`);
  return res.data;
}

export async function registerUser(data) {
  const res = await api.post('/users/', data);
  return res.data;
}

export async function loginUser(data) {
  const res = await api.post('/users/login', data);
  return res.data;
}