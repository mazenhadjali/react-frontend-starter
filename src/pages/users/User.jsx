import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useRevokeRole, useDeleteUser } from "@/api/services";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Shield,
  User,
  Settings,
  Activity,
  Clock,
  UserCheck,
  UserX
} from "lucide-react";
import { ROUTES } from "@/constants";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUser(id);
  const revokeRole = useRevokeRole();
  const deleteUser = useDeleteUser();

  const handleBack = () => {
    navigate(ROUTES.USERS.path);
  };

  const handleRevokeRole = async (roleId) => {
    try {
      await revokeRole.mutateAsync({ userId: parseInt(id), roleId });
    } catch (error) {
      console.error("Failed to revoke role:", error);
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser.mutateAsync(parseInt(id));
        navigate(ROUTES.USERS.path);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-full space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="flex-1">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-full space-y-6">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Users
        </Button>
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-red-500 mb-4">
              <User className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium mb-2">User Not Found</h3>
            <p className="text-gray-500 mb-4">
              The user you're looking for doesn't exist or has been deleted.
            </p>
            <Button onClick={handleBack}>
              Return to Users List
            </Button>
          </CardContent>
        </Card>
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {user?.username}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              User ID: #{user?.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/dashboard/users/${user?.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit User
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                User Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Activity className="h-4 w-4 mr-2" />
                Activity Log
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleDeleteUser}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Profile Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="relative">
                  {user?.avatar ? (
                    <Avatar className="h-20 w-20">
                      <img 
                        src={user.avatar.path} 
                        alt={user.username}
                        className="h-full w-full object-cover"
                      />
                    </Avatar>
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-10 w-10 text-primary-600" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl mb-1">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user?.username
                    }
                  </CardTitle>
                  <CardDescription className="text-base">
                    @{user?.username}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {user?.roles?.map((role) => (
                      <Badge key={role.id} variant="secondary" className="gap-1">
                        <Shield className="h-3 w-3" />
                        {role.name}
                      </Badge>
                    ))}
                    {(!user?.roles || user.roles.length === 0) && (
                      <Badge variant="outline" className="text-gray-500">
                        No roles assigned
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{user?.email || "No email provided"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{user?.phone || "No phone provided"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{user?.cin || "No CIN provided"}</span>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Account Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-gray-600">Joined:</span>
                        <span className="ml-2">Jan 15, 2024</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-gray-600">Last active:</span>
                        <span className="ml-2">2 hours ago</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Roles & Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Roles & Permissions
              </CardTitle>
              <CardDescription>
                Manage user roles and access levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user?.roles?.map((role) => (
                  <div key={role.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{role.name}</p>
                      <p className="text-xs text-gray-500">{role.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {role.features?.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature.replace(/_/g, ' ').toLowerCase()}
                          </Badge>
                        ))}
                        {role.features?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRevokeRole(role.id)}
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {(!user?.roles || user.roles.length === 0) && (
                  <div className="text-center py-6 text-gray-500">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No roles assigned</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/dashboard/users/${user?.id}/manage`}>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Manage Roles
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Assign Role
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>
                Common user management tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Reset Password
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  View Activity
                </Button>
                <Separator className="my-2" />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={handleDeleteUser}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
