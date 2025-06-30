import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import LoadingSpinner from '../shared/components/LoadingSpinner'
import RootLayout from '../shared/layout/RootLayout'
import AuthLayout from '../shared/layout/AuthLayout'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

// Lazy loading de componentes principales
const Dashboard = lazy(() => import('../dashboard/DashboardPage'))
const Login = lazy(() => import('../auth/LoginPage'))
const CandidatesList = lazy(() => import('../candidates/CandidatesListPage'))
const JobsList = lazy(() => import('../jobs/JobsListPage'))
const ApplicationsList = lazy(() => import('../applications/ApplicationsListPage'))
const InterviewsList = lazy(() => import('../interviews/InterviewsListPage'))
const RecruitersList = lazy(() => import('../recruiters/RecruitersListPage'))
const AdminDashboard = lazy(() => import('../admin/AdminDashboardPage'))
const Settings = lazy(() => import('../settings/SettingsPage'))
const Profile = lazy(() => import('../profile/ProfilePage'))
const NotFound = lazy(() => import('../shared/components/NotFound'))

// Componente wrapper para Suspense
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Rutas públicas (solo para usuarios no autenticados)
      {
        element: <PublicRoute />,
        children: [
          {
            path: '/auth',
            element: <AuthLayout />,
            children: [
              {
                path: 'login',
                element: (
                  <SuspenseWrapper>
                    <Login />
                  </SuspenseWrapper>
                ),
              },
            ],
          },
        ],
      },
      // Rutas privadas (requieren autenticación)
      {
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: (
              <SuspenseWrapper>
                <Dashboard />
              </SuspenseWrapper>
            ),
          },
          {
            path: 'dashboard',
            element: (
              <SuspenseWrapper>
                <Dashboard />
              </SuspenseWrapper>
            ),
          },
          {
            path: 'candidates',
            element: (
              <SuspenseWrapper>
                <CandidatesList />
              </SuspenseWrapper>
            ),
          },
          {
            path: 'jobs',
            element: (
              <SuspenseWrapper>
                <JobsList />
              </SuspenseWrapper>
            ),
          },
          {
            path: 'applications',
            element: (
              <SuspenseWrapper>
                <ApplicationsList />
              </SuspenseWrapper>
            ),
          },
          {
            path: 'interviews',
            element: (
              <SuspenseWrapper>
                <InterviewsList />
              </SuspenseWrapper>
            ),
          },
          {
            path: 'recruiters',
            element: (
              <SuspenseWrapper>
                <RecruitersList />
              </SuspenseWrapper>
            ),
          },
          {
            path: 'admin',
            element: (
              <SuspenseWrapper>
                <AdminDashboard />
              </SuspenseWrapper>
            ),
          },
          {
            path: 'settings',
            element: (
              <SuspenseWrapper>
                <Settings />
              </SuspenseWrapper>
            ),
          },
          {
            path: 'profile',
            element: (
              <SuspenseWrapper>
                <Profile />
              </SuspenseWrapper>
            ),
          },
        ],
      },
      // Ruta 404
      {
        path: '*',
        element: (
          <SuspenseWrapper>
            <NotFound />
          </SuspenseWrapper>
        ),
      },
    ],
  },
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter 