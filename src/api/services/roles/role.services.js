import axiosClient from "@/api/axiosClient";
import { RoleEndpoints } from "@/api/endpoints";

/**
 * Role management service
 * Handles all role-related API calls
 */
export const roleService = {
    /**
     * Get all roles
     * @returns {Promise<RoleDto[]>} Array of role objects
     */
    async getAllRoles() {
        const { data } = await axiosClient.get(RoleEndpoints.getAll());
        return data;
    },

    /**
     * Get a role by ID
     * @param {number} id - Role ID
     * @returns {Promise<RoleDto>} Role object
     */
    async getRoleById(id) {
        const { data } = await axiosClient.get(RoleEndpoints.getById(id));
        return data;
    },

    /**
     * Create a new role
     * @param {RoleRequest} roleData - Role creation data
     * @param {string} roleData.name - Role name
     * @param {string} roleData.description - Role description
     * @returns {Promise<RoleDto>} Created role object
     */
    async createRole(roleData) {
        const { data } = await axiosClient.post(RoleEndpoints.create(), roleData);
        return data;
    },

    /**
     * Update an existing role
     * @param {number} id - Role ID
     * @param {RoleRequest} roleData - Role update data
     * @param {string} roleData.name - Role name
     * @param {string} roleData.description - Role description
     * @returns {Promise<Role>} Updated role object (full Role entity)
     */
    async updateRole(id, roleData) {
        const { data } = await axiosClient.put(RoleEndpoints.update(id), roleData);
        return data;
    },

    /**
     * Delete a role
     * @param {number} id - Role ID
     * @returns {Promise<void>}
     */
    async deleteRole(id) {
        await axiosClient.delete(RoleEndpoints.delete(id));
    },

    /**
     * Add features to a role
     * @param {number} roleId - Role ID
     * @param {RoleFeatureRequest} featureData - Feature data
     * @param {number} featureData.id - Feature ID (optional)
     * @param {string} featureData.feature - Feature name/type
     * Available features: LIST_USERS, CREATE_USER, UPDATE_USER, DELETE_USER, 
     * RESET_USER_PASSWORD, ASSIGN_ROLE_TO_USER, REVOKE_ROLE_FROM_USER, 
     * LIST_ROLES, CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE, 
     * ASSIGN_FEATURE_TO_ROLE, REVOKE_FEATURE_FROM_ROLE
     * @returns {Promise<string>} Success message
     */
    async addFeatures(roleId, featureData) {
        const { data } = await axiosClient.post(RoleEndpoints.addFeatures(roleId), featureData);
        return data;
    },

    /**
     * Remove features from a role
     * @param {number} roleId - Role ID
     * @param {RoleFeatureRequest} featureData - Feature data
     * @param {number} featureData.id - Feature ID (optional)
     * @param {string} featureData.feature - Feature name/type
     * @returns {Promise<string>} Success message
     */
    async removeFeatures(roleId, featureData) {
        const { data } = await axiosClient.delete(RoleEndpoints.removeFeatures(roleId), {
            data: featureData
        });
        return data;
    },
};
