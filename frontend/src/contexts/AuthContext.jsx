import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/client';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user: userData } = response.data;
    

      // Guardar token y usuario
      localStorage.setItem('access_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      // Normalizar mensaje de error
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Error al iniciar sesión';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };
    
  const register = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/api/auth/register', { email, password });
      const { token, user: userData } = response.data;

      // Opcional: dejar al usuario logueado tras registrarse
      //if (token && userData) {
      //  localStorage.setItem('access_token', token);
      //  localStorage.setItem('user', JSON.stringify(userData));
      //  setUser(userData);
      //}
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Error al registrar usuario';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};