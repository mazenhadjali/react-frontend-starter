import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Skeleton } from '../../components/ui/skeleton';
import { ArrowLeft, Save } from 'lucide-react';
import { getRoleById, updateRole } from '@/api/services';
import { ROUTES } from '@/constants';

const EditRole = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [role, setRole] = useState(null);
    const [isLoadingRole, setIsLoadingRole] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch role data
    useEffect(() => {
        const fetchRole = async () => {
            try {
                setIsLoadingRole(true);
                const data = await getRoleById(id);
                setRole(data);
            } catch (error) {
                console.error('Failed to fetch role:', error);
            } finally {
                setIsLoadingRole(false);
            }
        };

        if (id) {
            fetchRole();
        }
    }, [id]);

    // Initialize form data when role is loaded
    useEffect(() => {
        if (role) {
            setFormData({
                name: role.name || '',
                description: role.description || ''
            });
        }
    }, [role]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Role name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Role name must be at least 2 characters';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
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
            setIsSubmitting(true);
            const roleData = {
                name: formData.name.trim(),
                description: formData.description.trim()
            };

            await updateRole(parseInt(id), roleData);
            navigate(ROUTES.ROLE_DETAIL.path.replace(':id', id));
        } catch (error) {
            console.error('Error updating role:', error);
            setErrors({ submit: 'Failed to update role. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoadingRole) {
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
                    onClick={() => navigate(ROUTES.ROLE_DETAIL.path.replace(':id', id))}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Role
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Edit Role</h1>
                    <p className="text-muted-foreground">Update role information and manage features</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Role Information</CardTitle>
                        <CardDescription>Update the basic role details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Role Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Role Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter role name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Enter role description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className={errors.description ? "border-red-500" : ""}
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description}</p>
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
                        onClick={() => navigate(ROUTES.ROLE_DETAIL.path.replace(':id', id))}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2"
                    >
                        <Save className="h-4 w-4" />
                        {isSubmitting ? 'Updating...' : 'Update Role'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditRole;
