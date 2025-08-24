import React from 'react';
import PropTypes from 'prop-types';
import NotAuthorized from './NotAuthorized';
import { useAuth } from '@/hooks/useAuth';

/**
 * Role Based Group Component (RBGC)
 * 
 * A component that conditionally renders children based on user permissions.
 * Checks if the user has all the required feature permissions from the user store.
 * 
 * @param {string[]} features - Array of feature names required to access the content
 * @param {React.ReactNode} children - The content to render if user has all required permissions
 * @param {React.ReactNode} fallback - Optional fallback content to render when user lacks permissions
 * @param {boolean} showBackButton - Flag to control the visibility of the back button in the NotAuthorized component
 * @param {boolean} hideFallback - Flag to control the visibility of the fallback content
 */
const RBGC = ({
    features = [],
    children,
    hideFallback = false,
    showBackButton = true,
    redirectionLocation = '/'
}) => {
    const { hasAllPermissions } = useAuth();

    // Only render children if user has all required permissions
    if (hasAllPermissions(features)) {
        return children;
    }

    if (!hideFallback) {
        return <NotAuthorized showBackButton={showBackButton} redirectionLocation={redirectionLocation} />;
    }

    return null;
};

RBGC.propTypes = {
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node.isRequired,
    hideFallback: PropTypes.bool,
    showBackButton: PropTypes.bool,
    redirectionLocation: PropTypes.string
};

export default RBGC;
