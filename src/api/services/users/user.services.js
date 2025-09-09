import axiosClient from "@/api/axiosClient";
import { UserEndpoints } from "@/api/endpoints";

/**
 * User management service
 * Handles all user-related API calls
 */
export const userService = {
    /**
     * Reset a user's password
     * @param {number} id - User ID
     * @param {{ password: string, confirmPassword: string }} passwordData - New password data
     * @returns {Promise<string>} Success message
     */
    async resetPassword(id, passwordData) {
        const { data } = await axiosClient.put(UserEndpoints.resetPassword(id), passwordData);
        return data;
    },
    /**
     * Get all users
     * @param {string} params - Query parameters for filtering
     * @returns {Promise<AUserDto[]>} Array of user objects
     */
    async getAllUsers(params) {
        const { data } = await axiosClient.get(UserEndpoints.getAll(params));
        return data;
    },

    /**
     * Get a user by ID
     * @param {number} id - User ID
     * @returns {Promise<AUserDto>} User object
     */
    async getUserById(id) {
        const { data } = await axiosClient.get(UserEndpoints.getById(id));
        return data;
    },

    /**
     * Create a new user
     * @param {CreateUserRequest} userData - User creation data
     * @param {string} userData.username - Username
     * @param {string} userData.email - Email address
     * @param {string} userData.password - Password
     * @param {string} userData.firstName - First name
     * @param {string} userData.lastName - Last name
     * @param {string} userData.phone - Phone number
     * @param {string} userData.cin - CIN number
     * @returns {Promise<AUserDto>} Created user object
     */
    async createUser(userData) {
        const { data } = await axiosClient.post(UserEndpoints.create(), userData);
        return data;
    },

    /**
     * Update an existing user
     * @param {number} id - User ID
     * @param {UpdateUserRequest} userData - User update data
     * @param {string} userData.username - Username
     * @param {string} userData.email - Email address
     * @param {string} userData.password - Password (optional)
     * @param {string} userData.firstName - First name
     * @param {string} userData.lastName - Last name
     * @param {string} userData.phone - Phone number
     * @param {string} userData.cin - CIN number
     * @returns {Promise<AUserDto>} Updated user object
     */
    async updateUser(id, userData) {
        const { data } = await axiosClient.put(UserEndpoints.update(id), userData);
        return data;
    },

    /**
     * Delete a user
     * @param {number} id - User ID
     * @returns {Promise<void>}
     */
    async deleteUser(id) {
        await axiosClient.delete(UserEndpoints.delete(id));
    },

    /**
     * Grant a role to a user
     * @param {number} userId - User ID
     * @param {number} roleId - Role ID
     * @returns {Promise<string>} Success message
     */
    async grantRole(userId, roleId) {
        const { data } = await axiosClient.post(UserEndpoints.grantRole(userId, roleId));
        return data;
    },

    /**
     * Revoke a role from a user
     * @param {number} userId - User ID
     * @param {number} roleId - Role ID
     * @returns {Promise<string>} Success message
     */
    async revokeRole(userId, roleId) {
        const { data } = await axiosClient.delete(UserEndpoints.revokeRole(userId, roleId));
        return data;
    },
};
