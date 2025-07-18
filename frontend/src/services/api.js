import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const createForm = (data, token) => API.post('/forms', data, { headers: { Authorization: `Bearer ${token}` } });
export const getForms = (token) => API.get('/forms', { headers: { Authorization: `Bearer ${token}` } });
export const getFormByPublicId = (publicId) => API.get(`/forms/public/${publicId}`);
export const submitResponse = (publicId, data) => API.post(`/responses/submit/${publicId}`, data);
export const getResponses = (formId, token) => API.get(`/responses/${formId}`, { headers: { Authorization: `Bearer ${token}` } });
