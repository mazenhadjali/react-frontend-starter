import { FaUsers } from "react-icons/fa";
import { IoShield } from "react-icons/io5";
import { RiHome4Line } from "react-icons/ri";
import { MdBugReport } from "react-icons/md";

// Route Constants
export const ROUTES = {
  // Public Routes
  LOGIN: {
    path: '/login',
    label: 'Login'
  },

  // Protected Dashboard Routes
  DASHBOARD: {
    path: '/dashboard',
    label: 'Dashboard',
    icon: RiHome4Line
  },
  DASHBOARD_HOME: {
    path: '/dashboard',
    label: 'Dashboard Home',
    isMenuItem: true,
    icon: RiHome4Line
  },
  USERS: {
    path: '/dashboard/users',
    label: 'Users',
    isMenuItem: true,
    features: ['LIST_USERS'],
    icon: FaUsers
  },
  ROLES: {
    path: '/dashboard/roles',
    label: 'Roles',
    features: ['LIST_ROLESd', 'LIST_ROLES'],
    isMenuItem: true,
    icon: IoShield
  },
  DEV_TEST: {
    path: '/dashboard/dev-test',
    label: 'Dev Testing',
    isMenuItem: true,
    icon: MdBugReport
  },

  // Default Routes
  ROOT: {
    path: '/',
    label: 'Root'
  }
};

export const getMenuItems = () => {
  return Object.values(ROUTES).filter(item => item.isMenuItem);
};

export default ROUTES;
