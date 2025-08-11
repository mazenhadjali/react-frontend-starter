import { useState } from 'react';

const Roles = () => {
  const [roles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Full system access and management capabilities',
      userCount: 2,
      permissions: ['create', 'read', 'update', 'delete', 'manage_users', 'manage_roles'],
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      id: 2,
      name: 'Moderator',
      description: 'Can manage content and moderate users',
      userCount: 5,
      permissions: ['read', 'update', 'moderate_content', 'manage_users'],
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      id: 3,
      name: 'User',
      description: 'Standard user with basic access',
      userCount: 1227,
      permissions: ['read', 'update_own'],
      gradient: 'from-info-500 to-info-600'
    },
    {
      id: 4,
      name: 'Guest',
      description: 'Limited read-only access',
      userCount: 0,
      permissions: ['read'],
      gradient: 'from-secondary-500 to-secondary-600'
    }
  ]);

  const getPermissionStyle = (permission) => {
    switch (permission) {
      case 'create':
        return 'bg-success-100 text-success-700 ring-success-600/20';
      case 'read':
        return 'bg-info-100 text-info-700 ring-info-600/20';
      case 'update':
      case 'update_own':
        return 'bg-warning-100 text-warning-700 ring-warning-600/20';
      case 'delete':
        return 'bg-error-100 text-error-700 ring-error-600/20';
      case 'manage_users':
      case 'manage_roles':
        return 'bg-primary-100 text-primary-700 ring-primary-600/20';
      case 'moderate_content':
        return 'bg-accent-100 text-accent-700 ring-accent-600/20';
      default:
        return 'bg-secondary-100 text-secondary-700 ring-secondary-600/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 -mx-6 -mt-6 px-6 pt-6 pb-6 rounded-b-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Roles Management</h1>
            <p className="text-secondary-600 mt-2">Manage roles and their permissions</p>
          </div>
          <button className="bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-medium hover:shadow-large transform hover:-translate-y-0.5">
            Create New Role
          </button>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-secondary-100 p-6 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${role.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-medium`}>
                  {role.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900">{role.name}</h3>
                  <p className="text-sm text-secondary-500 flex items-center mt-1">
                    <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                    {role.userCount} users
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-3 text-secondary-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button className="p-3 text-secondary-400 hover:text-error-600 hover:bg-error-50 rounded-xl transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <p className="text-secondary-600 mb-6 leading-relaxed">{role.description}</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-secondary-800">Permissions</h4>
                <span className="text-xs text-secondary-500 bg-secondary-100 px-2 py-1 rounded-full">
                  {role.permissions.length} permissions
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ring-1 ring-inset ${getPermissionStyle(permission)}`}
                  >
                    {permission.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Overview */}
      <div className="bg-white rounded-2xl shadow-soft border border-secondary-100">
        <div className="p-6 border-b border-secondary-100">
          <h2 className="text-xl font-bold text-secondary-900">Permission Types Overview</h2>
          <p className="text-secondary-600 mt-1">Understanding different permission levels</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Create', 
                description: 'Can create new resources and content', 
                gradient: 'from-success-500 to-success-600',
                icon: '✨'
              },
              { 
                name: 'Read', 
                description: 'Can view and access resources', 
                gradient: 'from-info-500 to-info-600',
                icon: '👁️'
              },
              { 
                name: 'Update', 
                description: 'Can modify existing resources', 
                gradient: 'from-warning-500 to-warning-600',
                icon: '✏️'
              },
              { 
                name: 'Delete', 
                description: 'Can remove and delete resources', 
                gradient: 'from-error-500 to-error-600',
                icon: '🗑️'
              }
            ].map((permission) => (
              <div key={permission.name} className="text-center p-6 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors duration-200">
                <div className={`w-16 h-16 bg-gradient-to-r ${permission.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-medium`}>
                  {permission.icon}
                </div>
                <h3 className="font-bold text-secondary-900 mb-2">{permission.name}</h3>
                <p className="text-sm text-secondary-600 leading-relaxed">{permission.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
