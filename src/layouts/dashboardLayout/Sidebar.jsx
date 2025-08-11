import { NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS, ROUTES } from '../../constants';
import clsx from 'clsx';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-gray-200 shadow-large rounded-xl">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-8 tracking-wide text-center">
          Admin Panel
        </h2>

        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = item.path === ROUTES.DASHBOARD
              ? location.pathname === ROUTES.DASHBOARD
              : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={clsx({
                  'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-100 group text-primary-200': true,
                  'bg-white/70 shadow-medium backdrop-blur-sm': isActive,
                  'hover:bg-white hover:shadow-soft': !isActive
                })}
              >
                <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`}>
                  <item.icon className="w-5 h-5" />
                </span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
