import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 p-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center shadow-large">
            <span className="text-5xl">🔍</span>
          </div>
          <div className="text-8xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
            404
          </div>
        </div>

        <h1 className="text-3xl font-bold text-secondary-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-secondary-600 mb-8 max-w-md mx-auto leading-relaxed">
          The page you are looking for doesn't exist or has been moved to a different location.
        </p>

        <div className="space-y-4">
          <Link
            to={ROUTES.DASHBOARD}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-medium transition-all duration-300 shadow-medium hover:shadow-large transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go to Dashboard
          </Link>

          <div className="text-center">
            <p className="text-sm text-secondary-500">
              Or{' '}
              <button
                onClick={() => window.history.back()}
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                go back to previous page
              </button>
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-secondary-200">
            <div className="text-2xl mb-2">🏠</div>
            <Link to={ROUTES.DASHBOARD} className="text-sm text-secondary-700 hover:text-primary-600 font-medium">
              Home
            </Link>
          </div>
          <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-secondary-200">
            <div className="text-2xl mb-2">👥</div>
            <Link to="/users" className="text-sm text-secondary-700 hover:text-primary-600 font-medium">
              Users
            </Link>
          </div>
          <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-secondary-200">
            <div className="text-2xl mb-2">🔐</div>
            <Link to="/roles" className="text-sm text-secondary-700 hover:text-primary-600 font-medium">
              Roles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
