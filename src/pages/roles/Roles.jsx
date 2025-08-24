import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRoles, useDeleteRole } from "@/api/services";
import { 
  Shield, 
  MoreHorizontal, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Settings
} from "lucide-react";

const Roles = () => {
  const { data: roles, isLoading, error } = useRoles();
  const deleteRole = useDeleteRole();
  const [deletingRoleId, setDeletingRoleId] = useState(null);

  const handleDeleteRole = async (roleId, roleName) => {
    if (window.confirm(`Are you sure you want to delete the role "${roleName}"?`)) {
      setDeletingRoleId(roleId);
      try {
        await deleteRole.mutateAsync(roleId);
      } catch (error) {
        console.error("Failed to delete role:", error);
      } finally {
        setDeletingRoleId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-full space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-full space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-red-500 mb-4">
              <Shield className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium mb-2">Failed to Load Roles</h3>
            <p className="text-gray-500 mb-4">
              There was an error loading the roles. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry
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
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Roles Management
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage roles and their permissions
          </p>
        </div>
        <Link to="/dashboard/roles/add">
          <Button size="sm" className="sm:size-default">
            <Plus className="h-4 w-4 mr-2" />
            Add Role
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {roles?.reduce((total, role) => total + (role.features?.length || 0), 0) || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
          <CardDescription>
            A list of all roles in your system and their permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {roles && roles.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">#{role.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium">{role.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">
                          {role.description || "No description"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-md">
                          {role.features && role.features.length > 0 ? (
                            <>
                              {role.features.slice(0, 3).map((feature, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {feature.replace(/_/g, ' ').toLowerCase()}
                                </Badge>
                              ))}
                              {role.features.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{role.features.length - 3} more
                                </Badge>
                              )}
                            </>
                          ) : (
                            <Badge variant="outline" className="text-gray-500">
                              No features
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={`/dashboard/roles/${role.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <Link to={`/dashboard/roles/${role.id}/edit`}>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Role
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteRole(role.id, role.name)}
                                className="text-red-600 focus:text-red-600"
                                disabled={deletingRoleId === role.id}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {deletingRoleId === role.id ? "Deleting..." : "Delete Role"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
              <p className="text-gray-500 mb-4">
                Get started by creating your first role.
              </p>
              <Link to="/dashboard/roles/add">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Roles;
