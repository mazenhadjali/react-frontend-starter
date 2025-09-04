import { useUserStore } from '@/store';

/**
 * Custom hook to access user data and authentication state
 * @returns {Object} User data and authentication utilities
 */
export const useAuth = () => {

    const {
        user,
        isLoading,
        isAuthenticated,
        error,
        login,
        logout,
        fetchMe,
        initializeAuth,
        setUser,
        clearUser
    } = useUserStore();

    // Helper function to extract all user permissions from roles
    const getAllUserPermissions = () => {
        if (!user || !user.roles || !Array.isArray(user.roles)) return [];

        try {
            const allPermissions = new Set();

            user.roles.forEach(role => {
                if (role && role.features && Array.isArray(role.features)) {
                    role.features.forEach(feature => allPermissions.add(feature));
                }
            });

            return Array.from(allPermissions);
        } catch (error) {
            console.error('Error extracting user permissions:', error);
            return [];
        }
    };

    // Get user roles
    const getUserRoles = () => {
        if (!user || !user.roles || !Array.isArray(user.roles)) return [];

        try {
            return user.roles.map(role => role.name).filter(Boolean);
        } catch (error) {
            console.error('Error extracting user roles:', error);
            return [];
        }
    };

    return {
        // User data
        user,
        isAuthenticated,
        isLoading,
        error,

        // Actions
        login,
        logout,
        fetchMe,
        initializeAuth,
        setUser,
        clearUser,

        // Permission utilities
        getAllUserPermissions,
        getUserRoles,

        // Utility functions
        hasPermission: (permission) => {
            if (!user) return false;
            const permissions = getAllUserPermissions();
            return permissions.includes(permission);
        },

        hasAllPermissions: (permissions = []) => {
            if (!user) return false;
            const userPermissions = getAllUserPermissions();
            return permissions.every(permission => userPermissions.includes(permission));
        },

        hasAnyPermission: (permissions = []) => {
            if (!user) return false;
            const userPermissions = getAllUserPermissions();
            return permissions.some(permission => userPermissions.includes(permission));
        },

        // Check if user has a specific role
        hasRole: (roleName) => {
            const userRoles = getUserRoles();
            return userRoles.includes(roleName);
        },

        // User info utilities
        getUserInitials: () => {
            if (!user) return "U";

            // Try firstName + lastName first, then fall back to username
            const firstName = user.firstName || "";
            const lastName = user.lastName || "";
            const username = user.username || "";

            if (firstName && lastName) {
                return (firstName[0] + lastName[0]).toUpperCase();
            } else if (firstName) {
                return firstName.slice(0, 2).toUpperCase();
            } else if (username) {
                return username.slice(0, 2).toUpperCase();
            }

            return "U";
        },

        getDisplayName: () => {
            if (!user) return "User";

            const firstName = user.firstName || "";
            const lastName = user.lastName || "";

            if (firstName && lastName) {
                return `${firstName} ${lastName}`;
            } else if (firstName) {
                return firstName;
            } else if (user.username) {
                return user.username;
            }

            return "User";
        },

        getDisplayEmail: () => user?.email || "user@example.com"
    };
};

export default useAuth;