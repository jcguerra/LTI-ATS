import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  // Temporal: siempre permitir acceso para desarrollo inicial
  const isAuthenticated = false

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />
}

export default PublicRoute 