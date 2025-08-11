import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES, AUTH_STORAGE_KEY } from '../constants';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY) === 'true';

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
