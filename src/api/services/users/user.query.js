// services/users/user.query.js

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { userService } from "./user.services";

// Query keys for React Query
export const userQueryKeys = {
    all: ['users'],
    lists: () => [...userQueryKeys.all, 'list'],
    list: (filters) => [...userQueryKeys.lists(), { filters }],
    details: () => [...userQueryKeys.all, 'detail'],
    detail: (id) => [...userQueryKeys.details(), id],
};

/**
 * Hook to fetch all users
 * @param {string} params - Query parameters for filtering
 */
export function useUsers(params) {
    return useQuery({
        queryKey: userQueryKeys.list(params),
        queryFn: () => userService.getAllUsers(params),
    });
}

/**
 * Hook to fetch a user by ID
 * @param {number} id - User ID
 */
export function useUser(id) {
    return useQuery({
        queryKey: userQueryKeys.detail(id),
        queryFn: () => userService.getUserById(id),
        enabled: !!id,
    });
}

/**
 * Hook to create a new user
 */
export function useCreateUser() {
    return useMutation({
        mutationFn: (userData) => userService.createUser(userData),
        onSuccess: () => {
            toast.success("User created successfully!");
        },
        meta: { 
            errorMessage: "Failed to create user", 
            mutationId: "createUser" 
        },
    });
}

/**
 * Hook to update a user
 */
export function useUpdateUser() {
    return useMutation({
        mutationFn: ({ id, userData }) => userService.updateUser(id, userData),
        onSuccess: () => {
            toast.success("User updated successfully!");
        },
        meta: { 
            errorMessage: "Failed to update user", 
            mutationId: "updateUser" 
        },
    });
}

/**
 * Hook to delete a user
 */
export function useDeleteUser() {
    return useMutation({
        mutationFn: (id) => userService.deleteUser(id),
        onSuccess: () => {
            toast.success("User deleted successfully!");
        },
        meta: { 
            errorMessage: "Failed to delete user", 
            mutationId: "deleteUser" 
        },
    });
}

/**
 * Hook to grant a role to a user
 */
export function useGrantRole() {
    return useMutation({
        mutationFn: ({ userId, roleId }) => userService.grantRole(userId, roleId),
        onSuccess: () => {
            toast.success("Role granted successfully!");
        },
        meta: { 
            errorMessage: "Failed to grant role", 
            mutationId: "grantRole" 
        },
    });
}

/**
 * Hook to revoke a role from a user
 */
export function useRevokeRole() {
    return useMutation({
        mutationFn: ({ userId, roleId }) => userService.revokeRole(userId, roleId),
        onSuccess: () => {
            toast.success("Role revoked successfully!");
        },
        meta: { 
            errorMessage: "Failed to revoke role", 
            mutationId: "revokeRole" 
        },
    });
}
