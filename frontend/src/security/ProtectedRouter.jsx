import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Componente que protege rutas: solo permite acceso si el usuario está autenticado.
 * Si no lo está, redirige a /login 
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Esperar a que termine la carga inicial antes de verificar autenticación
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);
   // Mostrar nada mientras carga o si no está autenticado (se redirigirá)
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return children;
};