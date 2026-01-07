import { useContext } from 'react';
import { AuthContext } from './Contexts';

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
