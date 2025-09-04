# React Query to Functional Services Refactoring Guide

This document outlines the refactoring process from React Query hooks to functional service calls.

## Overview

The project has been refactored to remove React Query dependency and use direct axios calls with functional service helpers.

## Changes Made

### 1. Dependencies Removed
- `@tanstack/react-query` removed from package.json

### 2. Files Removed
- `src/api/queryClient.js` - React Query client configuration

### 3. Files Updated

#### App.jsx
- Removed `QueryClientProvider` wrapper
- Removed queryClient import

#### Service Files Converted
All `*.query.js` files converted to functional helpers:

- `auth/auth.query.js` → functional auth helpers
- `users/user.query.js` → functional user helpers  
- `roles/role.query.js` → functional role helpers
- `features/feature.query.js` → functional feature helpers

## Migration Pattern

### Before (React Query Hook)
```jsx
import { useUsers, useCreateUser } from "@/api/services";

const Component = () => {
  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();

  const handleCreate = async () => {
    try {
      await createUser.mutateAsync(userData);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* render users */}</div>;
};
```

### After (Functional Services)
```jsx
import { getAllUsers, createUser } from "@/api/services";
import { useState, useEffect } from "react";

const Component = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreate = async () => {
    try {
      setIsSubmitting(true);
      await createUser(userData);
      // Optionally refetch data
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* render users */}</div>;
};
```

## Service Functions Available

### Auth Services
- `loginUser(credentials)` - Login with toast notifications
- `logoutUser()` - Logout with toast notifications  
- `getCurrentUser()` - Get current user profile

### User Services
- `getAllUsers(params)` - Get all users
- `getUserById(id)` - Get user by ID
- `createUser(userData)` - Create user with toast notifications
- `updateUser(id, userData)` - Update user with toast notifications
- `deleteUser(id)` - Delete user with toast notifications
- `grantRole(userId, roleId)` - Grant role with toast notifications
- `revokeRole(userId, roleId)` - Revoke role with toast notifications

### Role Services
- `getAllRoles()` - Get all roles
- `getRoleById(id)` - Get role by ID
- `createRole(roleData)` - Create role with toast notifications
- `updateRole(id, roleData)` - Update role with toast notifications
- `deleteRole(id)` - Delete role with toast notifications
- `addFeatures(roleId, featureData)` - Add features with toast notifications
- `removeFeatures(roleId, featureData)` - Remove features with toast notifications

### Feature Services
- `getAllFeatures()` - Get all available features

## Benefits

1. **Simplified Dependencies**: Removed React Query dependency
2. **Direct Control**: Direct axios calls with custom error handling
3. **Toast Notifications**: Built-in success/error notifications
4. **Flexibility**: Easy to customize behavior per component
5. **Standard React Patterns**: Uses useState and useEffect

## Notes

- All service functions include proper error handling
- Success operations show toast notifications automatically
- Error handling is consistent across all services
- Components manage their own loading and error states
- Axios client remains unchanged with interceptors for auth and error handling
