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
  USER_DETAIL: {
    path: '/dashboard/users/:id',
    label: 'User Detail',
    features: ['LIST_USERS']
  },
  ADD_USER: {
    path: '/dashboard/users/add',
    label: 'Add User',
    features: ['CREATE_USER']
  },
  EDIT_USER: {
    path: '/dashboard/users/:id/edit',
    label: 'Edit User',
    features: ['UPDATE_USER']
  },
  MANAGE_USER: {
    path: '/dashboard/users/:id/manage',
    label: 'Manage User',
    features: ['UPDATE_USER', 'ASSIGN_ROLES']
  },
  ROLES: {
    path: '/dashboard/roles',
    label: 'Roles',
    features: ['LIST_ROLES'],
    isMenuItem: true,
    icon: IoShield
  },
  ROLE_DETAIL: {
    path: '/dashboard/roles/:id',
    label: 'Role Detail',
    features: ['LIST_ROLES']
  },
  ADD_ROLE: {
    path: '/dashboard/roles/add',
    label: 'Add Role',
    features: ['CREATE_ROLE']
  },
  EDIT_ROLE: {
    path: '/dashboard/roles/:id/edit',
    label: 'Edit Role',
    features: ['UPDATE_ROLE']
  },
  MANAGE_ROLE: {
    path: '/dashboard/roles/:id/manage',
    label: 'Manage Role',
    features: ['UPDATE_ROLE', 'ASSIGN_FEATURES']
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
