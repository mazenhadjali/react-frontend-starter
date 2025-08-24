# 🏗️ Architecture Documentation

## Overview

This document provides a detailed overview of the React Frontend Starter architecture, design patterns, and best practices implemented throughout the codebase.

## 🎯 Core Architecture Principles

### 1. **Separation of Concerns**
- **Presentation Layer**: React components and layouts
- **Business Logic**: Custom hooks and services
- **Data Layer**: API services and state management
- **Configuration**: Environment and build configuration

### 2. **Modular Design**
- Feature-based folder structure
- Reusable component library
- Shared utilities and constants
- Pluggable authentication system

### 3. **Performance First**
- Code splitting and lazy loading
- Optimized bundle size
- Efficient re-rendering strategies

## 🔄 Data Flow Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Components    │◄──►│   Custom Hooks   │◄──►│  API Services   │
│                 │    │                  │    │                 │
│ - UI Logic      │    │ - Business Logic │    │ - HTTP Requests │
│ - Event Handling│    │ - State Logic    │    │ - Data Transform│
│ - Rendering     │    │ - Side Effects   │    │ - Error Handling│
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Zustand State   │    │  TanStack Query  │    │   API Server    │
│                 │    │                  │    │                 │
│                 │    │ - Cache          │    │ - REST/GraphQL  │
│                 │    │ - Background     │    │ - Authentication│
│                 │    │   Refetch        │    │ - Authorization │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🗂️ Folder Structure Deep Dive

### `/src/api/` - API Layer

**Purpose**: Centralized API management and configuration

```
api/
├── axiosClient.js      # HTTP client with interceptors
├── endpoints.js        # API endpoint definitions
├── queryClient.js      # TanStack Query configuration
└── services/           # Feature-specific API services
    └── auth/
        ├── auth.query.js    # React Query hooks for auth
        └── auth.services.js # Raw API calls for auth
```

**Key Features**:
- Centralized error handling
- Request/response interceptors
- Automatic retry logic

### `/src/components/` - Component Library

**Purpose**: Reusable UI components and business logic components

```
components/
├── NotAuthorized.jsx   # 403 error component
├── ProtectedRoute.jsx  # Authentication guard
├── RBGC.jsx           # Role-based access control
├── Services.jsx       # Service layer utilities
└── ui/                # Primitive UI components
    ├── avatar.jsx
    ├── button.jsx
    ├── dropdown-menu.jsx
    ├── input.jsx
    ├── separator.jsx
    ├── sheet.jsx
    ├── sidebar.jsx
    ├── skeleton.jsx
    └── tooltip.jsx
```

**Design Patterns**:
- **Compound Components**: For complex UI patterns
- **Render Props**: For flexible component composition
- **Higher-Order Components**: For cross-cutting concerns
- **Custom Hooks**: For reusable stateful logic

### `/src/layouts/` - Layout System

**Purpose**: Application layouts and page templates

```
layouts/
└── dashboardLayout/
    ├── Header.jsx      # Top navigation bar
    ├── index.jsx       # Main layout wrapper
    ├── nav-user.jsx    # User profile navigation
    └── Sidebar.jsx     # Side navigation menu
```

**Layout Features**:
- Responsive design breakpoints
- Collapsible sidebar
- Breadcrumb navigation
- User profile integration

### `/src/pages/` - Page Components

**Purpose**: Top-level page components representing different routes

```
pages/
├── HomeDashboard.jsx   # Dashboard home page
├── Login.jsx          # Authentication page
├── NotFound.jsx       # 404 error page
├── Roles.jsx          # Role management page
└── Users.jsx          # User management page
```

**Page Responsibilities**:
- Route-level data fetching
- Page-specific state management
- SEO metadata
- Analytics tracking

## 🔐 Authentication Architecture

### Role-Based Access Control (RBAC)

The RBAC system is implemented through the `RBGC` component:

```jsx
// Example: Component that requires specific permissions
<RBGC features={['F1', 'F2']}>
  <UserManagementTable />
</RBGC>

// Example: Route-level protection
<RBGC features={['F3']} redirectionLocation="/unauthorized">
  <AdminDashboard />
</RBGC>
```

This architecture documentation provides a comprehensive overview of the design decisions, patterns, and best practices implemented in the React Frontend Starter project.
