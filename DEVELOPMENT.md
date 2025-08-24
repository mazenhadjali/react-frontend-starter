# 🔧 Development Guide

## Getting Started

This guide will help you set up the development environment and get familiar with the codebase structure and development workflow.

## 🛠️ Prerequisites

### Required Software

- **Node.js** (v18 or higher)
- **Git**


## 🚀 Setup Instructions

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/mazenhadjali/react-frontend-starter.git
cd react-frontend-starter

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure Explained

### Core Directories

```
src/
├── api/               # API layer - all backend communication
├── components/        # Reusable UI components
├── constants/         # Application constants and configuration
├── hooks/            # Custom React hooks
├── layouts/          # Page layouts and templates
├── lib/              # Third-party library configurations
├── pages/            # Page components (route components)
├── utils/            # Utility functions and helpers
└── assets/           # Static assets (images, fonts, etc.)
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `UserProfile.jsx` |
| Hooks | camelCase with `use` prefix | `useAuth.js` |
| Utilities | camelCase | `formatDate.js` |
| Constants | SCREAMING_SNAKE_CASE | `API_ENDPOINTS.js` |
| Types | PascalCase | `UserType.js` |