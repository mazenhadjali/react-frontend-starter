import { FaUsers } from "react-icons/fa";
import { IoShield } from "react-icons/io5";
import { RiHome4Line } from "react-icons/ri";

// Route Constants
export const ROUTES = {
  // Public Routes
  LOGIN: '/login',

  // Protected Dashboard Routes
  DASHBOARD: '/dashboard',
  DASHBOARD_HOME: '/dashboard',
  USERS: '/dashboard/users',
  ROLES: '/dashboard/roles',

  // Default Routes
  ROOT: '/',
};

// Route Labels for navigation
export const ROUTE_LABELS = {
  [ROUTES.DASHBOARD_HOME]: 'Home Dashboard',
  [ROUTES.USERS]: 'Users',
  [ROUTES.ROLES]: 'Roles',
};

// Navigation Items for Sidebar
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
  }
];



export default ROUTES;
