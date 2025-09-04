// features/feature.helpers.js
import { featureService } from "./feature.services";

/**
 * Get all available features with error handling
 * @returns {Promise<Array>} Array of feature names
 */
export async function getAllFeatures() {
    try {
        return await featureService.getAllFeatures();
    } catch (error) {
        console.error("Failed to fetch features:", error);
        throw error;
    }
}

/**
 * Available features that can be assigned to roles
 * This is a static list based on the API documentation
 */
export const FEATURE_DESCRIPTIONS = {
    'LIST_USERS': 'View users list',
    'CREATE_USER': 'Create new users', 
    'UPDATE_USER': 'Update user information',
    'DELETE_USER': 'Delete users',
    'RESET_USER_PASSWORD': 'Reset user passwords',
    'ASSIGN_ROLE_TO_USER': 'Assign roles to users',
    'REVOKE_ROLE_FROM_USER': 'Remove roles from users',
    'LIST_ROLES': 'View roles list',
    'CREATE_ROLE': 'Create new roles',
    'UPDATE_ROLE': 'Update role information', 
    'DELETE_ROLE': 'Delete roles',
    'ASSIGN_FEATURE_TO_ROLE': 'Assign features to roles',
    'REVOKE_FEATURE_FROM_ROLE': 'Remove features from roles'
};
