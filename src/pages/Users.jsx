import { useState } from 'react';

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2 hours ago',
      avatar: null
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '1 day ago',
      avatar: null
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Moderator',
      status: 'Inactive',
      lastLogin: '3 days ago',
      avatar: null
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '5 minutes ago',
      avatar: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusStyle = (status) => {
    return status === 'Active' 
      ? 'bg-success-100 text-success-700 ring-success-600/20' 
      : 'bg-error-100 text-error-700 ring-error-600/20';
  };

  const getRoleStyle = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-primary-100 text-primary-700 ring-primary-600/20';
      case 'Moderator':
        return 'bg-accent-100 text-accent-700 ring-accent-600/20';
      default:
        return 'bg-info-100 text-info-700 ring-info-600/20';
    }
  };

  const getAvatarGradient = (name) => {
    const gradients = [
      'from-primary-500 to-primary-600',
      'from-accent-500 to-accent-600', 
      'from-info-500 to-info-600',
      'from-success-500 to-success-600',
      'from-warning-500 to-warning-600'
    ];
    const index = name.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 -mx-6 -mt-6 px-6 pt-6 pb-6 rounded-b-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Users Management</h1>
            <p className="text-secondary-600 mt-2">Manage your users and their permissions</p>
          </div>
          <button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-medium hover:shadow-large transform hover:-translate-y-0.5">
            Add New User
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-secondary-400">🔍</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <select className="px-4 py-3 border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Moderator</option>
            <option>User</option>
          </select>
          <select className="px-4 py-3 border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-secondary-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-secondary-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getAvatarGradient(user.name)} rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-medium`}>
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-secondary-900">{user.name}</div>
                        <div className="text-sm text-secondary-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ring-inset ${getRoleStyle(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ring-inset ${getStatusStyle(user.status)}`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${user.status === 'Active' ? 'bg-success-500' : 'bg-error-500'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-800 px-3 py-1 rounded-lg hover:bg-primary-50 transition-all duration-200">
                        Edit
                      </button>
                      <button className="text-error-600 hover:text-error-800 px-3 py-1 rounded-lg hover:bg-error-50 transition-all duration-200">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-secondary-200">
        <div className="text-sm text-secondary-600">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
          <span className="font-medium">{users.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-secondary-600 bg-white border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
            Previous
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-200">
            1
          </button>
          <button className="px-4 py-2 text-sm font-medium text-secondary-600 bg-white border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
