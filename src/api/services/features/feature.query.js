import { useQuery } from "@tanstack/react-query";
import { featureService } from "./feature.services";

// Query keys for React Query
export const featureQueryKeys = {
    all: ['features'],
    lists: () => [...featureQueryKeys.all, 'list'],
};

/**
 * Hook to fetch all available features
 */
export function useFeatures() {
    return useQuery({
        queryKey: featureQueryKeys.lists(),
        queryFn: () => featureService.getAllFeatures(),
    });
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
