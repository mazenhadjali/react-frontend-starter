# 🚀 React Frontend Starter

> A modern, feature-rich React starter template with authentication, role-based access control, and a beautiful dashboard layout.

## ✨ Features

- 🔥 **React 19** - Latest React with modern hooks and features
- ⚡ **Vite** - Ultra-fast build tool and development server
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework
- 🔐 **Authentication System** - Complete login/logout functionality
- 🛡️ **Role-Based Access Control (RBAC)** - Permission-based component rendering
- 🗂️ **React Router v7** - Advanced routing with nested layouts
- 🔄 **Functional API Services** - Clean axios-based service layer with toast notifications
- 📡 **Axios** - HTTP client with interceptors and error handling
- 🎭 **Radix UI** - Unstyled, accessible UI components
- 🎯 **ESLint** - Code linting and formatting
- 📱 **Responsive Design** - Mobile-first approach
- 🎪 **Sonner** - Beautiful toast notifications
- 🎨 **Lucide Icons** - Beautiful SVG icons
- 🏪 **Zustand** - Lightweight state management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/mazenhadjali/react-frontend-starter.git

# Navigate to project directory
cd react-frontend-starter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 📁 Project Structure

```
frontend-starter/
├── 📄 Configuration Files
│   ├── components.json         # Shadcn/ui component configuration
│   ├── eslint.config.js       # ESLint configuration
│   ├── jsconfig.json          # JavaScript configuration
│   ├── package.json           # Dependencies and scripts
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── vite.config.js         # Vite build configuration
│
├── 🌐 Public Assets
│   └── public/
│       └── vite.svg           # Vite logo
│
└── 📦 Source Code
    └── src/
        ├── 🎯 Application Entry
        │   ├── App.jsx            # Main App component
        │   ├── AppRoutes.jsx      # Route definitions
        │   ├── main.jsx           # Application entry point
        │   ├── App.css            # Global app styles
        │   └── index.css          # Global CSS imports
        │
        ├── 🔌 API Layer
        │   └── api/
        │       ├── axiosClient.js     # Axios configuration & interceptors
        │       ├── endpoints.js       # API endpoint definitions
        │       └── services/          # Functional API service modules
        │           ├── auth/
        │           │   ├── auth.query.js    # Auth helper functions
        │           │   └── auth.services.js # Auth services
        │           ├── users/
        │           │   ├── user.query.js    # User helper functions  
        │           │   └── user.services.js # User services
        │           ├── roles/
        │           │   ├── role.query.js    # Role helper functions
        │           │   └── role.services.js # Role services
        │           └── features/
        │               ├── feature.query.js  # Feature helper functions
        │               └── feature.services.js # Feature services
        │
        ├── 🧩 Components
        │   └── components/
        │       ├── NotAuthorized.jsx  # 403 error component
        │       ├── ProtectedRoute.jsx # Route protection
        │       ├── RBGC.jsx          # Role-based access control
        │       ├── Services.jsx      # Service utilities
        │       └── ui/               # Reusable UI components
        │           ├── avatar.jsx
        │           ├── button.jsx
        │           ├── dropdown-menu.jsx
        │           ├── input.jsx
        │           ├── separator.jsx
        │           ├── sheet.jsx
        │           ├── sidebar.jsx
        │           ├── skeleton.jsx
        │           └── tooltip.jsx
        │
        ├── 📋 Constants
        │   └── constants/
        │       ├── index.js           # Global constants
        │       └── routes.js          # Route definitions
        │
        ├── 🪝 Custom Hooks
        │   └── hooks/
        │       ├── use-mobile.js      # Mobile detection hook
        │       └── useAuth.js         # Authentication hook
        │
        ├── 🏗️ Layouts
        │   └── layouts/
        │       └── dashboardLayout/
        │           ├── Header.jsx     # Dashboard header
        │           ├── index.jsx      # Main layout component
        │           ├── nav-user.jsx   # User navigation
        │           └── Sidebar.jsx    # Dashboard sidebar
        │
        ├── 📚 Utilities
        │   ├── lib/
        │   │   └── utils.js           # Utility functions
        │   └── utils/
        │       ├── colors.js          # Color utilities
        │       └── index.js           # Utility exports
        │
        ├── 📄 Pages
        │   └── pages/
        │       ├── HomeDashboard.jsx  # Dashboard home
        │       ├── Login.jsx          # Login page
        │       ├── NotFound.jsx       # 404 error page
        │       ├── DevTestPage/       # Development testing pages
        │       ├── roles/             # Role management pages
        │       │   ├── AddRole.jsx    # Create new role
        │       │   ├── EditRole.jsx   # Edit existing role
        │       │   ├── ManageRole.jsx # Manage role features
        │       │   ├── Role.jsx       # Role details view
        │       │   └── Roles.jsx      # Role listing
        │       └── users/             # User management pages
        │           ├── AddUser.jsx    # Create new user
        │           ├── EditUser.jsx   # Edit existing user
        │           ├── ManageUser.jsx # Manage user roles
        │           ├── User.jsx       # User details view
        │           └── Users.jsx      # User listing
        │
        └── 🎨 Assets
            └── assets/                # Static assets
        │
        └── 📦 State Management
            └── store/
                ├── index.js           # Store configuration
                └── userStore.js       # User state management
```

## 🏗️ Architecture Overview

### 🗂️ Routing Structure

The application uses a nested routing structure with role-based access control:

- **Public Routes**: `/login`
- **Protected Routes**: `/dashboard/*`
  - Dashboard Home: `/dashboard`
  - Users Management: `/dashboard/users/*`
    - Users List: `/dashboard/users`
    - User Details: `/dashboard/users/:id`
    - Add User: `/dashboard/users/add`
    - Edit User: `/dashboard/users/:id/edit`
    - Manage User Roles: `/dashboard/users/:id/manage`
  - Roles Management: `/dashboard/roles/*`
    - Roles List: `/dashboard/roles`
    - Role Details: `/dashboard/roles/:id`
    - Add Role: `/dashboard/roles/add`
    - Edit Role: `/dashboard/roles/:id/edit`
    - Manage Role Features: `/dashboard/roles/:id/manage`


## 🔧 Core Components

### 🎯 Main Application Components

| Component | Purpose | Location |
|-----------|---------|----------|
| `App.jsx` | Root component with providers | `src/App.jsx` |
| `AppRoutes.jsx` | Route configuration | `src/AppRoutes.jsx` |
| `DashboardLayout` | Main dashboard layout | `src/layouts/dashboardLayout/` |
| `ProtectedRoute` | Route authentication guard | `src/components/ProtectedRoute.jsx` |
| `RBGC` | Role-based access control | `src/components/RBGC.jsx` |

### 🔌 API Management

| File | Purpose | Description |
|------|---------|-------------|
| `axiosClient.js` | HTTP client setup | Configured Axios instance with interceptors |
| `endpoints.js` | API endpoints | Centralized endpoint definitions |
| `services/` | API service layer | Functional service modules with built-in error handling |

### 📡 Service Functions

The application uses functional service calls instead of hooks:

**Authentication Services:**
- `loginUser(credentials)` - Login with toast notifications
- `logoutUser()` - Logout functionality
- `getCurrentUser()` - Get current user profile

**User Management Services:**
- `getAllUsers(params)` - Fetch all users
- `getUserById(id)` - Fetch user by ID
- `createUser(userData)` - Create new user
- `updateUser(id, userData)` - Update existing user
- `deleteUser(id)` - Delete user
- `grantRole(userId, roleId)` - Grant role to user
- `revokeRole(userId, roleId)` - Revoke role from user

**Role Management Services:**
- `getAllRoles()` - Fetch all roles
- `getRoleById(id)` - Fetch role by ID
- `createRole(roleData)` - Create new role
- `updateRole(id, roleData)` - Update existing role
- `deleteRole(id)` - Delete role
- `addFeatures(roleId, featureData)` - Add features to role
- `removeFeatures(roleId, featureData)` - Remove features from role

**Feature Services:**
- `getAllFeatures()` - Fetch all available features

### 🎨 UI Components

Built on top of **Radix UI** primitives with **Tailwind CSS** styling:

- **Button**: Customizable button component with variants
- **Input**: Form input with validation states
- **Avatar**: User avatar with fallback
- **Dropdown Menu**: Accessible dropdown menus
- **Sidebar**: Collapsible navigation sidebar
- **Sheet**: Slide-out panels
- **Tooltip**: Accessible tooltips
- **Table**: Data table components for listing
- **Card**: Container components for content sections
- **Badge**: Status and category indicators

### 🔧 Utility Components

- **RBGC**: Role-based group component for feature access control
- **ProtectedRoute**: Route-level authentication guard
- **NotAuthorized**: 403 error page component
- **RoleAssignmentTable**: Component for managing user roles
- **FeatureAssignmentTable**: Component for managing role features

## ⚙️ Configuration

### 🎨 Tailwind CSS

The project uses Tailwind CSS v4 with custom configuration:

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Custom theme extensions
    }
  }
}
```

## 🔐 Authentication System

### Storage Strategy

The application uses `localStorage` for:
- Access token: `access_token`
- Refresh token: `refresh_token` (if using refresh tokens)

### Authentication Flow

1. **Login Process**: 
   - User submits credentials
   - `loginUser()` service handles authentication
   - Tokens stored in localStorage
   - User redirected to dashboard

2. **Token Management**:
   - Axios interceptors automatically add tokens to requests
   - Automatic token refresh on 401 errors
   - Logout clears all stored tokens

### Protected Routes

Routes are protected using the `ProtectedRoute` component:

```jsx
<ProtectedRoute>
  <DashboardContent />
</ProtectedRoute>
```

### Permission-Based Rendering

Use the `RBGC` component for feature-level access control:

```jsx
<RBGC features={['CREATE_USER', 'UPDATE_USER']}>
  <AdminUserPanel />
</RBGC>
```

### Available Features

The system supports the following permission features:
- `LIST_USERS` - View users list
- `CREATE_USER` - Create new users
- `UPDATE_USER` - Update user information
- `DELETE_USER` - Delete users
- `RESET_USER_PASSWORD` - Reset user passwords
- `ASSIGN_ROLE_TO_USER` - Assign roles to users
- `REVOKE_ROLE_FROM_USER` - Remove roles from users
- `LIST_ROLES` - View roles list
- `CREATE_ROLE` - Create new roles
- `UPDATE_ROLE` - Update role information
- `DELETE_ROLE` - Delete roles
- `ASSIGN_FEATURE_TO_ROLE` - Assign features to roles
- `REVOKE_FEATURE_FROM_ROLE` - Remove features from roles

## 💻 Usage Examples

### Data Fetching Pattern

```jsx
import { useState, useEffect } from 'react';
import { getAllUsers } from '@/api/services';

const UsersList = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
};
```

### Form Submission Pattern

```jsx
import { useState } from 'react';
import { createUser } from '@/api/services';

const AddUserForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await createUser(formData);
      // Success toast is automatically shown
      // Reset form or redirect
    } catch (error) {
      // Error toast is automatically shown
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
};
```

### Production Checklist

- [ ] Environment variables configured
- [ ] API endpoints updated for production
- [ ] Build optimization verified
- [ ] Asset optimization confirmed
- [ ] Error tracking setup
- [ ] Analytics integration
- [ ] SEO meta tags added
- [ ] Authentication tokens secured
- [ ] CORS configuration verified

## 📈 Performance Optimization

### Built-in Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Vite's built-in optimization
- **Lazy Loading**: React.lazy for components
- **Functional Services**: Lightweight service layer without external dependencies
- **Optimized State Management**: Zustand for minimal state management

## 🐛 Troubleshooting

### Common Issues

**Build Errors**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Styling Issues**:
```bash
# Rebuild Tailwind CSS
npm run build
```

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the lightning-fast build tool
- **Tailwind Labs** for the utility-first CSS framework
- **Radix UI** for accessible component primitives
- **Axios** for reliable HTTP client functionality
- **Zustand** for lightweight state management

---


**Built with ❤️ by [Mazen Hadjali](https://github.com/mazenhadjali)**

⭐ **Star this repo if you find it helpful!** ⭐

