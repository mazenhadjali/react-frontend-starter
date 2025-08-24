import React from 'react';
import { useAuth } from '@/hooks/useAuth';

/**
 * Test component to demonstrate authentication features
 * This component shows how to use the useAuth hook with your backend data structure
 */
const AuthTestComponent = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getUserRoles,
    getAllUserPermissions,
    getDisplayName,
    getUserInitials,
    getDisplayEmail
  } = useAuth();

  if (isLoading) {
    return <div className="p-4">Loading user data...</div>;
  }

  if (!isAuthenticated) {
    return <div className="p-4 text-red-600">Not authenticated</div>;
  }

  const allPermissions = getAllUserPermissions();
  const userRoles = getUserRoles();

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Authentication Test Component</h2>
      
      {/* User Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">User Information</h3>
        <div className="bg-gray-50 p-4 rounded">
          <p><strong>Display Name:</strong> {getDisplayName()}</p>
          <p><strong>Email:</strong> {getDisplayEmail()}</p>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Initials:</strong> {getUserInitials()}</p>
          <p><strong>Phone:</strong> {user?.phone}</p>
          <p><strong>CIN:</strong> {user?.cin}</p>
        </div>
      </div>

      {/* Roles */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">User Roles</h3>
        <div className="bg-gray-50 p-4 rounded">
          {userRoles.length > 0 ? (
            <ul className="list-disc list-inside">
              {userRoles.map((role, index) => (
                <li key={index} className="text-blue-600">{role}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No roles assigned</p>
          )}
        </div>
      </div>

      {/* Permissions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">User Permissions ({allPermissions.length})</h3>
        <div className="bg-gray-50 p-4 rounded max-h-40 overflow-y-auto">
          {allPermissions.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {allPermissions.map((permission, index) => (
                <span key={index} className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {permission}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No permissions assigned</p>
          )}
        </div>
      </div>


      {/* Raw User Data */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Raw User Data</h3>
        <div className="bg-gray-50 p-4 rounded">
          <pre className="text-xs overflow-x-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AuthTestComponent;
