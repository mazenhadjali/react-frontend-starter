// roles/role.helpers.js
import { toast } from "sonner";
import { roleService } from "./role.services";

/**
 * Get all roles with error handling
 * @returns {Promise<Array>} Array of role objects
 */
export async function getAllRoles() {
    try {
        return await roleService.getAllRoles();
    } catch (error) {
        console.error("Failed to fetch roles:", error);
        throw error;
    }
}

/**
 * Get a role by ID with error handling
 * @param {number} id - Role ID
 * @returns {Promise<Object>} Role object
 */
export async function getRoleById(id) {
    try {
        return await roleService.getRoleById(id);
    } catch (error) {
        console.error(`Failed to fetch role ${id}:`, error);
        throw error;
    }
}

/**
 * Create a new role with toast notifications
 * @param {Object} roleData - Role creation data
 * @returns {Promise<Object>} Created role object
 */
export async function createRole(roleData) {
    try {
        const result = await roleService.createRole(roleData);
        toast.success("Role created successfully!");
        return result;
    } catch (error) {
        toast.error(`Failed to create role: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}

/**
 * Update a role with toast notifications
 * @param {number} id - Role ID
 * @param {Object} roleData - Role update data
 * @returns {Promise<Object>} Updated role object
 */
export async function updateRole(id, roleData) {
    try {
        const result = await roleService.updateRole(id, roleData);
        toast.success("Role updated successfully!");
        return result;
    } catch (error) {
        toast.error(`Failed to update role: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}

/**
 * Delete a role with toast notifications
 * @param {number} id - Role ID
 * @returns {Promise<void>}
 */
export async function deleteRole(id) {
    try {
        await roleService.deleteRole(id);
        toast.success("Role deleted successfully!");
        return true;
    } catch (error) {
        toast.error(`Failed to delete role: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}

/**
 * Add features to a role with toast notifications
 * @param {number} roleId - Role ID
 * @param {Object} featureData - Feature data
 * @returns {Promise<string>} Success message
 */
export async function addFeatures(roleId, featureData) {
    try {
        const result = await roleService.addFeatures(roleId, featureData);
        toast.success("Features added successfully!");
        return result;
    } catch (error) {
        toast.error(`Failed to add features: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}

/**
 * Remove features from a role with toast notifications
 * @param {number} roleId - Role ID
 * @param {Object} featureData - Feature data
 * @returns {Promise<string>} Success message
 */
export async function removeFeatures(roleId, featureData) {
    try {
        const result = await roleService.removeFeatures(roleId, featureData);
        toast.success("Features removed successfully!");
        return result;
    } catch (error) {
        toast.error(`Failed to remove features: ${error.message || "An unexpected error occurred"}`);
        throw error;
    }
}
