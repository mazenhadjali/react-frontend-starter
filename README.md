# 🚀 React Frontend Starter

> A modern, feature-rich React starter template with authentication, role-based access control, and a beautiful dashboard layout.

## ✨ Features

- 🔥 **React 19** - Latest React with modern hooks and features
- ⚡ **Vite** - Ultra-fast build tool and development server
- 🎨 **Tailwind CSS v4** - Modern utility-first CSS framework
- 🔐 **Authentication System** - Complete login/logout functionality
- 🛡️ **Role-Based Access Control (RBAC)** - Permission-based component rendering
- 🗂️ **React Router v7** - Advanced routing with nested layouts
- 🔄 **TanStack Query** - Powerful data fetching and caching
- 📡 **Axios** - HTTP client with interceptors
- 🎭 **Radix UI** - Unstyled, accessible UI components
- 🎯 **ESLint** - Code linting and formatting
- 📱 **Responsive Design** - Mobile-first approach
- 🎪 **Sonner** - Beautiful toast notifications
- 🎨 **Lucide Icons** - Beautiful SVG icons

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
        │       ├── axiosClient.js     # Axios configuration
        │       ├── endpoints.js       # API endpoint definitions
        │       ├── queryClient.js     # TanStack Query setup
        │       └── services/          # API service modules
        │           └── auth/
        │               ├── auth.query.js    # Auth queries
        │               └── auth.services.js # Auth services
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
        │       └── use-mobile.js      # Mobile detection hook
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
        │       ├── Roles.jsx          # Role management
        │       └── Users.jsx          # User management
        │
        └── 🎨 Assets
            └── assets/                # Static assets
```

## 🏗️ Architecture Overview

### 🗂️ Routing Structure

The application uses a nested routing structure with role-based access control:

- **Public Routes**: `/login`
- **Protected Routes**: `/dashboard/*`
  - Dashboard Home: `/dashboard`
  - Users Management: `/dashboard/users`
  - Roles Management: `/dashboard/roles`


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
| `queryClient.js` | TanStack Query config | Global query/mutation configuration |
| `endpoints.js` | API endpoints | Centralized endpoint definitions |

### 🎨 UI Components

Built on top of **Radix UI** primitives with **Tailwind CSS** styling:

- **Button**: Customizable button component with variants
- **Input**: Form input with validation states
- **Avatar**: User avatar with fallback
- **Dropdown Menu**: Accessible dropdown menus
- **Sidebar**: Collapsible navigation sidebar
- **Sheet**: Slide-out panels
- **Tooltip**: Accessible tooltips

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
- Authentication status: `AUTH_STORAGE_KEY`
- User permissions: `permissions` (JSON array)

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
<RBGC features={['F1']}>
  <AdminUserPanel />
</RBGC>
```

### Production Checklist

- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] Build optimization verified
- [ ] Asset optimization confirmed
- [ ] Error tracking setup
- [ ] Analytics integration
- [ ] SEO meta tags added

## 📈 Performance Optimization

### Built-in Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Vite's built-in optimization
- **Lazy Loading**: React.lazy for components
- **Query Caching**: TanStack Query caching

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
- **TanStack** for excellent data fetching tools

---


**Built with ❤️ by [Mazen Hadjali](https://github.com/mazenhadjali)**

⭐ **Star this repo if you find it helpful!** ⭐

