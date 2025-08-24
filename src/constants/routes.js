import { FaUsers } from "react-icons/fa";
import { IoShield } from "react-icons/io5";
import { RiHome4Line } from "react-icons/ri";
import { MdBugReport } from "react-icons/md";

// Route Constants
export const ROUTES = {
  // Public Routes
  LOGIN: '/login',

  // Protected Dashboard Routes
  DASHBOARD: '/dashboard',
  DASHBOARD_HOME: '/dashboard',
  USERS: '/dashboard/users',
  ROLES: '/dashboard/roles',
  DEV_TEST: '/dashboard/dev-test',

  // Default Routes
  ROOT: '/',
};

// Route Labels for navigation
export const ROUTE_LABELS = {
  [ROUTES.DASHBOARD_HOME]: 'Home Dashboard',
  [ROUTES.USERS]: 'Users',
  [ROUTES.ROLES]: 'Roles',
  [ROUTES.DEV_TEST]: 'Dev Testing',
};

// Navigation Items for Sidebar (DEV_TEST only shown in development)
export const NAV_ITEMS = [
  {
    name: 'Home Dashboard',
    path: ROUTES.DASHBOARD_HOME,
    icon: RiHome4Line
  },
  {
    name: 'Users',
    path: ROUTES.USERS,
    icon: FaUsers
  },
  {
    name: 'Roles',
    path: ROUTES.ROLES,
    icon: IoShield
  },
  // Development only - can be conditionally shown
  ...(import.meta.env.DEV ? [{
    name: 'Dev Testing',
    path: ROUTES.DEV_TEST,
    icon: MdBugReport,
    isDev: true
  }] : [])
];



export default ROUTES;
