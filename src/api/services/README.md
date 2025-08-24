# API Services Documentation

This directory contains all the API service modules for managing users, roles, and features in the application.

## Services Overview

### User Services (`/users`)
- **userService**: Core service for user CRUD operations
- **useUsers**: React Query hook for fetching all users
- **useUser**: React Query hook for fetching a single user
- **useCreateUser**: React Query hook for creating users
- **useUpdateUser**: React Query hook for updating users
- **useDeleteUser**: React Query hook for deleting users
- **useGrantRole**: React Query hook for granting roles to users
- **useRevokeRole**: React Query hook for revoking roles from users

### Role Services (`/roles`)
- **roleService**: Core service for role CRUD operations
- **useRoles**: React Query hook for fetching all roles
- **useRole**: React Query hook for fetching a single role
- **useCreateRole**: React Query hook for creating roles
- **useUpdateRole**: React Query hook for updating roles
- **useDeleteRole**: React Query hook for deleting roles
- **useAddFeatures**: React Query hook for adding features to roles
- **useRemoveFeatures**: React Query hook for removing features from roles

### Feature Services (`/features`)
- **featureService**: Core service for feature operations
- **useFeatures**: React Query hook for fetching all available features
- **FEATURE_DESCRIPTIONS**: Static object with feature descriptions

### Auth Services (`/auth`)
- **auth**: Core authentication service
- **useLogin**: React Query hook for user login
- **useLogout**: React Query hook for user logout

## Usage Examples

### User Management

```jsx
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '@/api/services';

function UserManagement() {
    const { data: users, isLoading } = useUsers();
    const createUser = useCreateUser();
    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();

    const handleCreateUser = async (userData) => {
        try {
            await createUser.mutateAsync(userData);
            // Success toast will be shown automatically
        } catch (error) {
            // Error toast will be shown automatically
        }
    };

    const handleUpdateUser = async (id, userData) => {
        try {
            await updateUser.mutateAsync({ id, userData });
        } catch (error) {
            // Handle error
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser.mutateAsync(id);
        } catch (error) {
            // Handle error
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {users?.map(user => (
                <div key={user.id}>
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                    <button onClick={() => handleDeleteUser(user.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
```

### Role Management

```jsx
import { useRoles, useCreateRole, useAddFeatures } from '@/api/services';

function RoleManagement() {
    const { data: roles, isLoading } = useRoles();
    const createRole = useCreateRole();
    const addFeatures = useAddFeatures();

    const handleCreateRole = async (roleData) => {
        try {
            await createRole.mutateAsync(roleData);
        } catch (error) {
            // Handle error
        }
    };

    const handleAddFeature = async (roleId, feature) => {
        try {
            await addFeatures.mutateAsync({ 
                roleId, 
                featureData: { feature } 
            });
        } catch (error) {
            // Handle error
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {roles?.map(role => (
                <div key={role.id}>
                    <h3>{role.name}</h3>
                    <p>{role.description}</p>
                    <div>Features: {role.features?.join(', ')}</div>
                </div>
            ))}
        </div>
    );
}
```

### User-Role Management

```jsx
import { useUser, useGrantRole, useRevokeRole } from '@/api/services';

function UserRoleManagement({ userId }) {
    const { data: user } = useUser(userId);
    const grantRole = useGrantRole();
    const revokeRole = useRevokeRole();

    const handleGrantRole = async (roleId) => {
        try {
            await grantRole.mutateAsync({ userId, roleId });
        } catch (error) {
            // Handle error
        }
    };

    const handleRevokeRole = async (roleId) => {
        try {
            await revokeRole.mutateAsync({ userId, roleId });
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div>
            <h2>{user?.username} Roles</h2>
            {user?.roles?.map(role => (
                <div key={role.id}>
                    <span>{role.name}</span>
                    <button onClick={() => handleRevokeRole(role.id)}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}
```

## Data Types

### User DTOs

**CreateUserRequest**
```typescript
{
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    cin: string;
}
```

**UpdateUserRequest**
```typescript
{
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    cin?: string;
}
```

**AUserDto**
```typescript
{
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    cin: string;
    avatar: FileAttachmentDto;
    roles: RoleDto[];
}
```

### Role DTOs

**RoleRequest**
```typescript
{
    name: string;
    description: string;
}
```

**RoleDto**
```typescript
{
    id: number;
    name: string;
    description: string;
    features: Feature[];
}
```

**RoleFeatureRequest**
```typescript
{
    id?: number;
    feature: string;
}
```

## Available Features

- `LIST_USERS`: View users list
- `CREATE_USER`: Create new users
- `UPDATE_USER`: Update user information
- `DELETE_USER`: Delete users
- `RESET_USER_PASSWORD`: Reset user passwords
- `ASSIGN_ROLE_TO_USER`: Assign roles to users
- `REVOKE_ROLE_FROM_USER`: Remove roles from users
- `LIST_ROLES`: View roles list
- `CREATE_ROLE`: Create new roles
- `UPDATE_ROLE`: Update role information
- `DELETE_ROLE`: Delete roles
- `ASSIGN_FEATURE_TO_ROLE`: Assign features to roles
- `REVOKE_FEATURE_FROM_ROLE`: Remove features from roles

## Error Handling

All mutations include automatic error handling with toast notifications. The `meta.errorMessage` property is used to display user-friendly error messages when mutations fail.

## Query Invalidation

React Query automatically invalidates and refetches related queries when mutations succeed:
- Creating/updating/deleting users invalidates the users list
- Creating/updating/deleting roles invalidates the roles list
- Role changes invalidate both the roles list and specific role details
- User role changes invalidate both users and specific user details
