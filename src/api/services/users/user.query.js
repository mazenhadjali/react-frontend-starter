// users/user.helpers.js
import { toast } from "sonner";
import { userService } from "./user.services";

/**
 * Get all users with error handling
 * @param {string} params - Query parameters for filtering
 * @returns {Promise<Array>} Array of user objects
 */
export async function getAllUsers(params) {
    try {
        return await userService.getAllUsers(params);
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
    }
}

/**
 * Get a user by ID with error handling
 * @param {number} id - User ID
 * @returns {Promise<Object>} User object
 */
export async function getUserById(id) {
    try {
        return await userService.getUserById(id);
    } catch (error) {
        console.error(`Failed to fetch user ${id}:`, error);
        throw error;
    }
}

/**
 * Create a new user with toast notifications
 * @param {Object} userData - User creation data
 * @returns {Promise<Object>} Created user object
 */
export async function createUser(userData) {
    try {
        const result = await userService.createUser(userData);
        toast.success("User created successfully!");
        return result;
    } catch (error) {
        toast.error(`Failed to create user: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}

/**
 * Update a user with toast notifications
 * @param {number} id - User ID
 * @param {Object} userData - User update data
 * @returns {Promise<Object>} Updated user object
 */
export async function updateUser(id, userData) {
    try {
        const result = await userService.updateUser(id, userData);
        toast.success("User updated successfully!");
        return result;
    } catch (error) {
        toast.error(`Failed to update user: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}

/**
 * Delete a user with toast notifications
 * @param {number} id - User ID
 * @returns {Promise<void>}
 */
export async function deleteUser(id) {
    try {
        await userService.deleteUser(id);
        toast.success("User deleted successfully!");
        return true;
    } catch (error) {
        toast.error(`Failed to delete user: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}

/**
 * Grant a role to a user with toast notifications
 * @param {number} userId - User ID
 * @param {number} roleId - Role ID
 * @returns {Promise<string>} Success message
 */
export async function grantRole(userId, roleId) {
    try {
        const result = await userService.grantRole(userId, roleId);
        toast.success("Role granted successfully!");
        return result;
    } catch (error) {
        toast.error(`Failed to grant role: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}

/**
 * Revoke a role from a user with toast notifications
 * @param {number} userId - User ID
 * @param {number} roleId - Role ID
 * @returns {Promise<string>} Success message
 */
export async function revokeRole(userId, roleId) {
    try {
        const result = await userService.revokeRole(userId, roleId);
        toast.success("Role revoked successfully!");
        return result;
    } catch (error) {
        toast.error(`Failed to revoke role: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}
