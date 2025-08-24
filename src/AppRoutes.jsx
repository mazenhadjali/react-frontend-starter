import { Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomeDashboard from './pages/HomeDashboard';
import Users from './pages/Users';
import Roles from './pages/Roles';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTES } from './constants';
import NotFound from './pages/NotFound';
import DashboardLayout from './layouts/dashboardLayout';
import RBGC from './components/RBGC';
import DevTestPage from './pages/DevTestPage';

const AppRoutes = [
  {
    /* Public Routes */
    path: ROUTES.LOGIN.path,
    element: <Login />
  },
  {
    /* Protected Dashboard Routes */
    path: ROUTES.DASHBOARD.path,
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeDashboard />
      },
      {
        path: ROUTES.USERS.path,
        element: <RBGC features={ROUTES.USERS.features}><Users /></RBGC>
      },
      {
        path: ROUTES.ROLES.path,
        element: <RBGC features={ROUTES.ROLES.features}><Roles /></RBGC>
      },
      {
        path: ROUTES.DEV_TEST.path,
        element: <DevTestPage />
      }
    ]
  },
  {
    /* Default redirect */
    path: ROUTES.ROOT.path,
    element: <Navigate to={ROUTES.DASHBOARD.path} replace />
  },
  {
    /* Catch all - redirect to dashboard */
    path: "*",
    element: <NotFound />
  }
];

export default AppRoutes;
