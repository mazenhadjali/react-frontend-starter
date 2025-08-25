import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRoles, useGrantRole, useRevokeRole } from '@/api/services';
import { 
  Plus, 
  Minus, 
  Search, 
  Shield, 
  Settings,
  Check,
  X
} from 'lucide-react';

const RoleAssignmentTable = ({ userId, userRoles = [], onRoleChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assigningRole, setAssigningRole] = useState(null);
  
  const { data: allRoles = [], isLoading } = useRoles();
  const grantRole = useGrantRole();
  const revokeRole = useRevokeRole();

  const userRoleIds = userRoles.map(role => role.id);
  
  const filteredRoles = allRoles.filter(role =>
    role?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleRole = async (role) => {
    setAssigningRole(role.id);
    try {
      const hasRole = userRoleIds.includes(role.id);
      
      if (hasRole) {
        await revokeRole.mutateAsync({ 
          userId: parseInt(userId), 
          roleId: role.id 
        });
      } else {
        await grantRole.mutateAsync({ 
          userId: parseInt(userId), 
          roleId: role.id 
        });
      }
      
      // Callback to refresh user data
      if (onRoleChange) {
        onRoleChange();
      }
    } catch (error) {
      console.error('Failed to toggle role:', error);
    } finally {
      setAssigningRole(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
          <CardDescription>Assign or revoke roles for this user</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Role Management
        </CardTitle>
        <CardDescription>
          Assign or revoke roles for this user. Click the action button to toggle role assignment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Roles Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                    {searchTerm ? 'No roles match your search' : 'No roles available'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRoles.map((role) => {
                  const hasRole = userRoleIds.includes(role.id);
                  const isAssigning = assigningRole === role.id;
                  
                  return (
                    <TableRow key={role.id} className={hasRole ? 'bg-green-50' : ''}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{role.name}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {role.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {role.features?.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {role.features?.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.features.length - 2}
                            </Badge>
                          )}
                          {(!role.features || role.features.length === 0) && (
                            <span className="text-xs text-gray-400">No features</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={hasRole ? "default" : "secondary"}
                          className={hasRole ? "bg-green-100 text-green-800" : ""}
                        >
                          {hasRole ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Assigned
                            </>
                          ) : (
                            <>
                              <X className="h-3 w-3 mr-1" />
                              Not Assigned
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant={hasRole ? "destructive" : "default"}
                          size="sm"
                          onClick={() => handleToggleRole(role)}
                          disabled={isAssigning}
                          className="w-20"
                        >
                          {isAssigning ? (
                            <Settings className="h-3 w-3 animate-spin" />
                          ) : hasRole ? (
                            <>
                              <Minus className="h-3 w-3 mr-1" />
                              Revoke
                            </>
                          ) : (
                            <>
                              <Plus className="h-3 w-3 mr-1" />
                              Assign
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="flex justify-between items-center text-sm text-gray-500 pt-2 border-t">
          <span>
            Total roles: {filteredRoles.length}
          </span>
          <span>
            User has {userRoles.length} role{userRoles.length !== 1 ? 's' : ''}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleAssignmentTable;
