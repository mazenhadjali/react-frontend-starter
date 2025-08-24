import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, User as UserIcon } from 'lucide-react';
import { useUser } from '@/api/services';
import RoleAssignmentTable from '@/components/RoleAssignmentTable';
import { ROUTES } from '@/constants';

const ManageUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading, refetch } = useUser(id);

  const handleBack = () => {
    navigate(ROUTES.USER_DETAIL.path.replace(':id', id));
  };

  const handleRoleChange = () => {
    // Refresh user data when roles change
    refetch();
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
              <UserIcon className="h-8 w-8" />
              Manage User: {user?.username}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              User ID: #{user?.id} • {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Role Assignment Table */}
      <RoleAssignmentTable 
        userId={id}
        userRoles={user?.roles || []}
        onRoleChange={handleRoleChange}
      />
    </div>
  );
};

export default ManageUser;
