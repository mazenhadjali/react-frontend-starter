import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import AuthTestComponent from "@/pages/DevTestPage/components/AuthTestComponent";

const DevTestPage = () => {
  const [isAuthSectionOpen, setIsAuthSectionOpen] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Page Header */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h1 className="text-2xl font-bold text-yellow-800 mb-2">
          🚧 Development Test Page
        </h1>
        <p className="text-yellow-700">
          This page is for development and testing purposes only. 
          It contains various test components and utilities for debugging.
        </p>
      </div>

      {/* Authentication Test Section */}
      <div className="bg-white rounded-lg shadow-md">
        <button
          onClick={() => setIsAuthSectionOpen(!isAuthSectionOpen)}
          className="w-full p-4 border-b border-gray-200 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Authentication System Test
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Test user authentication, permissions, and role-based access control
              </p>
            </div>
            <div className="flex-shrink-0 ml-4">
              {isAuthSectionOpen ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
        </button>
        {isAuthSectionOpen && (
          <div className="p-4">
            <AuthTestComponent />
          </div>
        )}
      </div>

    </div>
  );
};

export default DevTestPage;
