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
    icon: '🏠'
  },
  {
    name: 'Users',
    path: ROUTES.USERS,
    icon: '👥'
  },
  {
    name: 'Roles',
    path: ROUTES.ROLES,
    icon: '🔐'
  }
];



export default ROUTES;
