import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES } from '../constants';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { 
    user, 
    isLoading,
    error,
    isAuthenticated, 
    initializeAuth 
  } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await initializeAuth();
      setIsInitialized(true);
    };
    
    initialize();
  }, [initializeAuth]);

  // Show loading while checking authentication
  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user || error) {
    // Redirect to login page with return url
    return <Navigate to={ROUTES.LOGIN.path} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
