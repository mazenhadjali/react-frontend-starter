import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Shield } from 'lucide-react';
import { getRoleById } from '@/api/services';
import FeatureAssignmentTable from '@/components/FeatureAssignmentTable';
import { ROUTES } from '@/constants';

const ManageRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        setIsLoading(true);
        const data = await getRoleById(id);
        setRole(data);
      } catch (error) {
        console.error('Failed to fetch role:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRole();
    }
  }, [id]);

  const handleBack = () => {
    navigate(ROUTES.ROLE_DETAIL.path.replace(':id', id));
  };


  if (isLoading) {
    return (
      <div className="w-full max-w-full space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleBack}
            className="h-10 w-10 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-8 w-8" />
              Manage Role: {role?.name}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Role ID: #{role?.id} • {role?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Feature Assignment Table */}
      <FeatureAssignmentTable 
        roleId={id}
        roleFeatures={role?.features || []}
      />
    </div>
  );
};

export default ManageRole;
