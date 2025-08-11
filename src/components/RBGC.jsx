import React from 'react';
import NotAuthorized from './NotAuthorized';

/**
 * Role Based Group Component (RBGC)
 * 
 * A component that conditionally renders children based on user permissions.
 * Checks if the user has all the required feature permissions from localStorage.
 * 
 * @param {string[]} features - Array of feature names required to access the content
 * @param {React.ReactNode} children - The content to render if user has all required permissions
 * @param {React.ReactNode} fallback - Optional fallback content to render when user lacks permissions
 * @param {boolean} showBackButton - Flag to control the visibility of the back button in the NotAuthorized component
 */
const RBGC = ({
    features = [],
    children,
    showBackButton = true,
    redirectionLocation = '/'
}) => {

    const hasAllPermissions = () => {
        try {
            const userPermissions = JSON.parse(localStorage.getItem("permissions") || '[]');

            if (!features || features.length === 0) {
                return true;
            }

            // Check if user has all required features
            return features.every(feature => userPermissions.includes(feature));
        } catch (error) {
            console.error('Error checking user permissions:', error);
            return false;
        }
    };

    // Only render children if user has all required permissions
    if (hasAllPermissions()) {
        return children;
    }
    return <NotAuthorized showBackButton={showBackButton} redirectionLocation={redirectionLocation} />;
};

export default RBGC;
