import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  // Temporal: siempre permitir acceso para desarrollo inicial
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />
}

export default PrivateRoute 