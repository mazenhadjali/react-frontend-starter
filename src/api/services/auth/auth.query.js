// auth/auth.helpers.js
import { toast } from "sonner";
import { auth } from "./auth.services";

/**
 * Login function with toast notifications
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.username - Username
 * @param {string} credentials.password - Password
 * @returns {Promise<Object>} User data and token
 */
export async function loginUser(credentials) {
    try {
        const result = await auth.login(credentials);
        toast.success("Welcome back!");
        return result;
    } catch (error) {
        toast.error(`Login failed: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}

/**
 * Logout function with toast notifications
 * @returns {Promise<void>}
 */
export async function logoutUser() {
    try {
        await auth.logout();
        return true;
    } catch (error) {
        toast.error(`Logout failed: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data
 */
export async function getCurrentUser() {
    try {
        return await auth.me();
    } catch (error) {
        console.error("Failed to get current user:", error);
        throw error;
    }
}
