import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const RequireAdmin = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return children;
};
