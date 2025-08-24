import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { ArrowLeft, UserPlus, Plus, X } from 'lucide-react';
import { useCreateUser, useRoles } from '@/api/services';
import { ROUTES } from '@/constants';

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [errors, setErrors] = useState({});

  const { data: roles = [], isLoading: isLoadingRoles } = useRoles();
  const createUserMutation = useCreateUser();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleRoleToggle = (role) => {
    setSelectedRoles(prev => 
      prev.includes(role.id) 
        ? prev.filter(r => r !== role.id)
        : [...prev, role.id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const newUser = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        password: formData.password,
        roles: selectedRoles.map(roleId => ({ id: roleId }))
      };

      const result = await createUserMutation.mutateAsync(newUser);
      navigate(ROUTES.USER_DETAIL.path.replace(':id', result.id));
    } catch (error) {
      console.error('Error creating user:', error);
      setErrors({ submit: 'Failed to create user. Please try again.' });
    }
  };

  if (isLoadingRoles) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const selectedRoleObjects = roles.filter(r => selectedRoles.includes(r.id));
  const availableRoles = roles.filter(r => !selectedRoles.includes(r.id));

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(ROUTES.USERS.path)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add New User</h1>
          <p className="text-muted-foreground">Create a new user account and assign roles</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Enter the basic user details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={errors.username ? "border-red-500" : ""}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Roles Management */}
          <Card>
            <CardHeader>
              <CardTitle>Roles Assignment</CardTitle>
              <CardDescription>Assign roles to this user</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Selected Roles */}
              <div className="space-y-2">
                <Label>Selected Roles ({selectedRoleObjects.length})</Label>
                <div className="min-h-[100px] p-3 border rounded-md bg-gray-50">
                  {selectedRoleObjects.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No roles selected
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedRoleObjects.map((role) => (
                        <Badge
                          key={role.id}
                          variant="default"
                          className="flex items-center gap-1 cursor-pointer hover:bg-red-600"
                          onClick={() => handleRoleToggle(role)}
                        >
                          {role.name}
                          <X className="h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Available Roles */}
              <div className="space-y-2">
                <Label>Available Roles ({availableRoles.length})</Label>
                <div className="min-h-[100px] max-h-[200px] overflow-y-auto p-3 border rounded-md">
                  {availableRoles.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      All roles are assigned
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {availableRoles.map((role) => (
                        <Badge
                          key={role.id}
                          variant="outline"
                          className="flex items-center gap-1 cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          onClick={() => handleRoleToggle(role)}
                        >
                          <Plus className="h-3 w-3" />
                          {role.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(ROUTES.USERS.path)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createUserMutation.isPending}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            {createUserMutation.isPending ? 'Creating...' : 'Create User'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
