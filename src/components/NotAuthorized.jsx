import React from 'react';
import { VscError } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = ({
    title = "Access Denied",
    message = "You don't have permission to view this content.",
    showBackButton = true,
    redirectionLocation
}) => {

    const navigate = useNavigate();
    const handleGoBack = () => {
        if (redirectionLocation) {
            navigate(redirectionLocation);
        } else {
            window.history.back();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            {/* Lock Icon */}
            <div className="mb-6">
                <VscError className='size-16 text-red-500 mx-auto' />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {title}
            </h1>

            {/* Message */}
            <p className="text-gray-600 mb-6 max-w-md">
                {message}
            </p>

            {/* Back Button */}
            {showBackButton && (
                <button
                    onClick={handleGoBack}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Go Back
                </button>
            )}
        </div>
    );
};

export default NotAuthorized;
