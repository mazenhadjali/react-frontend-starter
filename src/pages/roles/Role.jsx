import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getRoleById, deleteRole } from "@/api/services";
import {
    ArrowLeft,
    Shield,
    MoreHorizontal,
    Edit,
    Trash2,
    Settings,
} from "lucide-react";
import { ROUTES } from "@/constants";
import clsx from "clsx";

const Role = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getRoleById(id);
                setRole(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchRole();
        }
    }, [id]);

    const handleBack = () => {
        navigate(ROUTES.ROLES.path);
    };

    const handleDeleteRole = async () => {
        if (window.confirm(`Are you sure you want to delete the role "${role?.name}"?`)) {
            try {
                setIsDeleting(true);
                await deleteRole(parseInt(id));
                navigate(ROUTES.ROLES.path);
            } catch (error) {
                console.error("Failed to delete role:", error);
            } finally {
                setIsDeleting(false);
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
                    Back to Roles
                </Button>
                <Card>
                    <CardContent className="p-8 text-center">
                        <div className="text-red-500 mb-4">
                            <Shield className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Role Not Found</h3>
                        <p className="text-gray-500 mb-4">
                            The role you're looking for doesn't exist or has been deleted.
                        </p>
                        <Button onClick={handleBack}>
                            Return to Roles List
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
                            {role?.name}
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base">
                            Role ID: #{role?.id}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link to={`/dashboard/roles/${id}/edit`}>
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Role
                        </Button>
                    </Link>
                    <Link to={`/dashboard/roles/${id}/manage`}>
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Manage Features
                        </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">

                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleDeleteRole}
                                className="text-red-600 focus:text-red-600"
                            >
                                <Trash2 className={clsx("h-4 w-4 mr-2", isDeleting && "animate-spin")} />
                                Delete Role
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Main Content */}
            {/* Role Information Card */}
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                                <Shield className="h-8 w-8 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <CardTitle className="text-xl mb-1">
                                    {role?.name}
                                </CardTitle>
                                <CardDescription className="text-base">
                                    {role?.description || "No description provided"}
                                </CardDescription>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <Badge variant="secondary" className="gap-1">
                                        <Shield className="h-3 w-3" />
                                        {role?.features?.length || 0} Features
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-3">Role Details</h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Role Name</label>
                                        <p className="text-sm text-gray-900">{role?.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Total Features</label>
                                        <p className="text-sm text-gray-900">{role?.features?.length || 0}</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="text-sm font-medium text-gray-500">Description</label>
                                        <p className="text-sm text-gray-900">{role?.description || "No description"}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="font-medium text-gray-900 mb-3">Current Features</h3>
                                <div className="flex flex-wrap gap-2">
                                    {role?.features && role.features.length > 0 ? (
                                        role.features.map((feature, index) => (
                                            <Badge key={index} variant="secondary">
                                                {feature}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No features assigned</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Role;
