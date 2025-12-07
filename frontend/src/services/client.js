import axios from 'axios';

// Definir la URL del backend desde variables de entorno
const BACKEND_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost:3001';

// Create axios instance
const api = axios.create({
  baseURL: BACKEND_URL,
});

// Helper function to get current tokens
const getAuthHeaders = (contentType = 'application/json') => {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': contentType,
    'Time-Zone-Offset': new Date().getTimezoneOffset(),
  };

 if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { headers };
};

// Request interceptor: añadir siempre el access token si existe
  api.interceptors.request.use(
  (config) => {
     const token = localStorage.getItem('access_token');
    if (token && !config.headers?.Authorization) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }  
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Si recibimos un 401 (no autorizado), limpiar tokens y redirigir a login
    if (error.response?.status === 401) {
      // No hacer nada si ya estamos en login o register para evitar loops
      const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';
      
      if (!isAuthPage) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export { api, getAuthHeaders };
