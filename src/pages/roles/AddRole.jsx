import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useCreateRole, useFeatures } from "@/api/services";
import { ArrowLeft, Shield, Plus, Check } from "lucide-react";
import { ROUTES } from "@/constants";

const AddRole = () => {
  const navigate = useNavigate();
  const { data: availableFeatures } = useFeatures();
  const createRole = useCreateRole();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Role name is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Role description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // First create the role
      const newRole = await createRole.mutateAsync({
        name: formData.name.trim(),
        description: formData.description.trim(),
      });

      // Then add features if any are selected
      // Note: This would require the role ID from the response
      // For now, we'll redirect to the role detail page where features can be added

      navigate(ROUTES.ROLE_DETAIL.path.replace(':id', newRole.id));
    } catch (error) {
      console.error("Failed to create role:", error);
      // Handle specific API errors here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(ROUTES.ROLES.path);
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
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
            Add New Role
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Create a new role and assign permissions
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Role Information</CardTitle>
              <CardDescription>
                Enter the basic information for the new role.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Role Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter role name..."
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter role description..."
                    className={errors.description ? "border-red-500" : ""}
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Role"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Features Preview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Available Features
              </CardTitle>
              <CardDescription>
                Features can be assigned after role creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableFeatures?.map((feature) => (
                  <div 
                    key={feature} 
                    className="flex items-center justify-between p-2 rounded-lg border bg-gray-50"
                  >
                    <span className="text-sm text-gray-600">
                      {feature}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Available
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                * Features will be assignable after the role is created
              </p>
            </CardContent>
          </Card>

          {/* Role Preview */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Role Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Name</Label>
                  <p className="text-sm">{formData.name || "Role name will appear here"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Description</Label>
                  <p className="text-sm text-gray-600">
                    {formData.description || "Role description will appear here"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddRole;
