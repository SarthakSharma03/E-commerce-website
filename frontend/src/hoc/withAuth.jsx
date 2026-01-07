import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />
  return children
}

export const GuestOnly = ({ children }) => {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/home" replace />
  return children
}

