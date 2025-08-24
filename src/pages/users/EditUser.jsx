import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Skeleton } from '../../components/ui/skeleton';
import { ArrowLeft, Save } from 'lucide-react';
import { useUpdateUser, useUser } from '@/api/services';
import { ROUTES } from '@/constants';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        cin: ''
    });
    const [errors, setErrors] = useState({});

    const { data: user, isLoading: isLoadingUser } = useUser(id);
    const updateUserMutation = useUpdateUser();

    // Initialize form data when user is loaded
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                cin: user.cin || ''
            });
        }
    }, [user]);

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
        if (!formData.cin.trim()) {
            newErrors.cin = 'CIN is required';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const userData = {
                username: formData.username.trim(),
                email: formData.email.trim(),
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                phone: formData.phone.trim(),
                cin: formData.cin.trim()
            };

            await updateUserMutation.mutateAsync({ id: parseInt(id), userData });
            navigate(ROUTES.USER_DETAIL.path.replace(':id', id));
        } catch (error) {
            console.error('Error updating user:', error);
            setErrors({ submit: 'Failed to update user. Please try again.' });
        }
    };

    if (isLoadingUser) {
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

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(ROUTES.USER_DETAIL.path.replace(':id', id))}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to User
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Edit User</h1>
                    <p className="text-muted-foreground">Update user information and manage roles</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Information</CardTitle>
                        <CardDescription>Update the basic user details</CardDescription>
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
                        {/* phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="text"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone}</p>
                            )}
                        </div>

                        {/* cin */}
                        <div className="space-y-2">
                            <Label htmlFor="cin">CIN *</Label>
                            <Input
                                id="cin"
                                name="cin"
                                type="text"
                                placeholder="Enter CIN"
                                value={formData.cin}
                                onChange={handleInputChange}
                                className={errors.cin ? "border-red-500" : ""}
                            />
                            {errors.cin && (
                                <p className="text-sm text-red-500">{errors.cin}</p>
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


                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(ROUTES.USER_DETAIL.path.replace(':id', id))}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={updateUserMutation.isPending}
                        className="flex items-center gap-2"
                    >
                        <Save className="h-4 w-4" />
                        {updateUserMutation.isPending ? 'Updating...' : 'Update User'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
