import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useFeatures, useAddFeatures, useRemoveFeatures, useRole } from '@/api/services';
import { Search, Code, Settings, Check, X } from 'lucide-react';

const FeatureAssignmentTable = ({ roleId }) => {

    const addFeatures = useAddFeatures();
    const removeFeatures = useRemoveFeatures();
    const { data: roleData, isLoading: isLoadingRole } = useRole(roleId);

    const [roleFeatures, setRoleFeatures] = useState(roleData?.features || []);

    const [searchTerm, setSearchTerm] = useState('');
    const [assigningFeature, setAssigningFeature] = useState(null);

    const { data: allFeatures = [], isLoading: isLoadingFeatures } = useFeatures();


    const filteredFeatures = allFeatures.filter(feature =>
        searchTerm === '' ||
        feature.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleFeature = async (feature) => {
        setAssigningFeature(feature);
        try {
            const hasFeature = roleFeatures?.includes(feature);

            if (hasFeature) {
                await removeFeatures.mutateAsync({
                    roleId: parseInt(roleId),
                    featureData: { feature: feature }
                });
            } else {
                await addFeatures.mutateAsync({
                    roleId: parseInt(roleId),
                    featureData: { feature: feature }
                });
            }

            //  now i want to change the feature status in the table
            setRoleFeatures((prevFeatures) => {
                if (hasFeature) {
                    return prevFeatures.filter((f) => f !== feature);
                } else {
                    return [...prevFeatures, feature];
                }
            });
        } catch (error) {
            console.error('Failed to toggle feature:', error);
        } finally {
            setAssigningFeature(null);
        }
    };

    if (isLoadingRole || isLoadingFeatures) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Feature Management</CardTitle>
                    <CardDescription>Assign or revoke features for this role</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map(i => (
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
                    <Code className="h-5 w-5" />
                    Feature Management
                </CardTitle>
                <CardDescription>
                    Assign or revoke features for this role. Click the action button to toggle feature assignment.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search features..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Features Table */}
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Feature</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFeatures.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                                        {searchTerm ? 'No features match your search' : 'No features available'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredFeatures.map((feature) => {
                                    const hasFeature = roleFeatures.includes(feature);
                                    const isAssigning = assigningFeature === feature;

                                    return (
                                        <TableRow key={feature} className={hasFeature ? 'bg-blue-50' : ''}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{feature}</p>

                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <p className="text-sm text-gray-600 max-w-xs truncate">
                                                    {feature.description || 'No description available'}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={hasFeature ? "default" : "secondary"}
                                                    className={hasFeature ? "bg-blue-100 text-blue-800" : ""}
                                                >
                                                    {hasFeature ? (
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
                                                    variant={hasFeature ? "destructive" : "default"}
                                                    size="sm"
                                                    onClick={() => handleToggleFeature(feature)}
                                                    disabled={isAssigning}
                                                    className="w-20"
                                                >
                                                    {isAssigning ? (
                                                        <Settings className="h-3 w-3 animate-spin" />
                                                    ) : hasFeature ? (<span> Remove </span>) : (<span> Add </span>)}
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
                        Total features: {filteredFeatures.length}
                    </span>
                    <span>
                        Role has {roleFeatures.length} feature{roleFeatures.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default FeatureAssignmentTable;
