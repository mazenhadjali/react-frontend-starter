import { Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomeDashboard from './pages/HomeDashboard';
import Users from './pages/users/Users';
import User from './pages/users/User';
import AddUser from './pages/users/AddUser';
import EditUser from './pages/users/EditUser';
import Roles from './pages/roles/Roles';
import Role from './pages/roles/Role';
import AddRole from './pages/roles/AddRole';
import EditRole from './pages/roles/EditRole';
import ManageUser from './pages/users/ManageUser';
import ManageRole from './pages/roles/ManageRole';
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
        path: ROUTES.USER_DETAIL.path,
        element: <RBGC features={ROUTES.USER_DETAIL.features}><User /></RBGC>
      },
      {
        path: ROUTES.ADD_USER.path,
        element: <RBGC features={ROUTES.ADD_USER.features}><AddUser /></RBGC>
      },
      {
        path: ROUTES.EDIT_USER.path,
        element: <RBGC features={ROUTES.EDIT_USER.features}><EditUser /></RBGC>
      },
      {
        path: ROUTES.MANAGE_USER.path,
        element: <RBGC features={ROUTES.MANAGE_USER.features}><ManageUser /></RBGC>
      },
      {
        path: ROUTES.ROLES.path,
        element: <RBGC features={ROUTES.ROLES.features}><Roles /></RBGC>
      },
      {
        path: ROUTES.ROLE_DETAIL.path,
        element: <RBGC features={ROUTES.ROLE_DETAIL.features}><Role /></RBGC>
      },
      {
        path: ROUTES.ADD_ROLE.path,
        element: <RBGC features={ROUTES.ADD_ROLE.features}><AddRole /></RBGC>
      },
      {
        path: ROUTES.EDIT_ROLE.path,
        element: <RBGC features={ROUTES.EDIT_ROLE.features}><EditRole /></RBGC>
      },
      {
        path: ROUTES.MANAGE_ROLE.path,
        element: <RBGC features={ROUTES.MANAGE_ROLE.features}><ManageRole /></RBGC>
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
