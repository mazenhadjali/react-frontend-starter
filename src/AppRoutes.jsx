import { Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomeDashboard from './pages/HomeDashboard';
import Users from './pages/Users';
import Roles from './pages/Roles';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTES } from './constants';
import NotFound from './pages/NotFound';
import DashboardLayout from './layouts/dashboardLayout';

const AppRoutes = [
  {
    /* Public Routes */
    path: ROUTES.LOGIN,
    element: <Login />
  },
  {
    /* Protected Dashboard Routes */
    path: ROUTES.DASHBOARD,
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
        path: "users",
        element: <Users />
      },
      {
        path: "roles",
        element: <Roles />
      }
    ]
  },
  {
    /* Default redirect */
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.DASHBOARD} replace />
  },
  {
    /* Catch all - redirect to dashboard */
    path: "*",
    element: <NotFound />
  }
];

export default AppRoutes;
