import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { roleService } from "./role.services";

// Query keys for React Query
export const roleQueryKeys = {
    all: ['roles'],
    lists: () => [...roleQueryKeys.all, 'list'],
    list: (filters) => [...roleQueryKeys.lists(), { filters }],
    details: () => [...roleQueryKeys.all, 'detail'],
    detail: (id) => [...roleQueryKeys.details(), id],
};

/**
 * Hook to fetch all roles
 */
export function useRoles() {
    return useQuery({
        queryKey: roleQueryKeys.lists(),
        queryFn: () => roleService.getAllRoles(),
    });
}

/**
 * Hook to fetch a role by ID
 * @param {number} id - Role ID
 */
export function useRole(id) {
    return useQuery({
        queryKey: roleQueryKeys.detail(id),
        queryFn: () => roleService.getRoleById(id),
        enabled: !!id,
    });
}

/**
 * Hook to create a new role
 */
export function useCreateRole() {
    return useMutation({
        mutationFn: (roleData) => roleService.createRole(roleData),
        onSuccess: () => {
            toast.success("Role created successfully!");
        },
        meta: { 
            errorMessage: "Failed to create role", 
            mutationId: "createRole" 
        },
    });
}

/**
 * Hook to update a role
 */
export function useUpdateRole() {
    return useMutation({
        mutationFn: ({ id, roleData }) => roleService.updateRole(id, roleData),
        onSuccess: () => {
            toast.success("Role updated successfully!");
        },
        meta: { 
            errorMessage: "Failed to update role", 
            mutationId: "updateRole" 
        },
    });
}

/**
 * Hook to delete a role
 */
export function useDeleteRole() {
    return useMutation({
        mutationFn: (id) => roleService.deleteRole(id),
        onSuccess: () => {
            toast.success("Role deleted successfully!");
        },
        meta: { 
            errorMessage: "Failed to delete role", 
            mutationId: "deleteRole" 
        },
    });
}

/**
 * Hook to add features to a role
 */
export function useAddFeatures() {
    return useMutation({
        mutationFn: ({ roleId, featureData }) => roleService.addFeatures(roleId, featureData),
        onSuccess: () => {
            toast.success("Features added successfully!");
        },
        meta: { 
            errorMessage: "Failed to add features", 
            mutationId: "addFeatures" 
        },
    });
}

/**
 * Hook to remove features from a role
 */
export function useRemoveFeatures() {
    return useMutation({
        mutationFn: ({ roleId, featureData }) => roleService.removeFeatures(roleId, featureData),
        onSuccess: () => {
            toast.success("Features removed successfully!");
        },
        meta: { 
            errorMessage: "Failed to remove features", 
            mutationId: "removeFeatures" 
        },
    });
}
