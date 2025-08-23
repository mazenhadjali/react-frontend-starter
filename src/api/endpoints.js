/**
 * API endpoint configurations
 * Centralized endpoint management for the application
 */

/**
 * auth-related endpoints
 */
export const AuthEndpoints = {
    /** Login a user */
    login: () => "/api/auth/login",
};

/**
 * User-related endpoints
 */
export const UserEndpoints = {
    /** Get all users with optional filtering */
    getAll: (params) => `/api/v1/users${params ? `?${params}` : ""}`,

    /** Get a single user by ID */
    getById: (id) => `/api/v1/users/${id}`,

    /** Create a new user */
    create: () => "/api/v1/users",

    /** Update an existing user */
    update: (id) => `/api/v1/users/${id}`,

    /** Delete a user */
    delete: (id) => `/api/v1/users/${id}`,

    /** grant a role to a user */
    grantRole: (userId, roleId) => `/api/v1/users/${userId}/roles/${roleId}`,

    /** revoke a role from a user */
    revokeRole: (userId, roleId) => `/api/v1/users/${userId}/roles/${roleId}`,
};

/**
 * Role-related endpoints
 */
export const RoleEndpoints = {
    /** Get all roles */
    getAll: () => "/api/v1/roles",

    /** Get a single role by ID */
    getById: (id) => `/api/v1/roles/${id}`,

    /** Create a new role */
    create: () => "/api/v1/roles",

    /** Update an existing role */
    update: (id) => `/api/v1/roles/${id}`,

    /** Delete a role */
    delete: (id) => `/api/v1/roles/${id}`,

    /** Assign features to a role */
    addFeatures: (roleId) => `/api/v1/roles/${roleId}/features`,

    /** Remove features from a role */
    removeFeatures: (roleId) => `/api/v1/roles/${roleId}/features`,
};
