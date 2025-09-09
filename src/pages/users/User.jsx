import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { getUserById, deleteUser, userService } from "@/api/services";
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
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // added for password reset
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetError, setResetError] = useState("");

  // added for password reset
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onResetPassword = async (data) => {
    try {
      setResetLoading(true);
      setResetSuccess("");
      setResetError("");
      await userService.resetPassword(parseInt(id), {
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setResetSuccess("Password updated successfully");
      form.reset();
    } catch (err) {
      setResetError("Failed to update password");
      console.error(err);
    } finally {
      setResetLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getUserById(id);
        setUser(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleBack = () => {
    navigate(ROUTES.USERS.path);
  };

  const handleDeleteUser = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setIsDeleting(true);
        await deleteUser(parseInt(id));
        navigate(ROUTES.USERS.path);
      } catch (error) {
        console.error("Failed to delete user:", error);
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
                <Activity className="h-4 w-4 mr-2" />
                Activity Log (coming soon)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDeleteUser}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className={clsx("h-4 w-4 mr-2", isDeleting && "animate-spin")} />
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
                        <span className="ml-2">--</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-gray-600">Last active:</span>
                        <span className="ml-2">--</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                          --
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Separator className="my-6" />

          <Card className="mt-6 border-0 shadow-none bg-transparent">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="reset-password" className="rounded-lg border bg-white/80 dark:bg-zinc-900/80 shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold flex items-center gap-2">
                  <UserX className="h-5 w-5 text-destructive" />
                  <span>Reset User Password</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onResetPassword)} className="space-y-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="password"
                          rules={{ required: "Password is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Enter new password" autoComplete="new-password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          rules={{
                            required: "Please confirm password",
                            validate: (value) =>
                              value === form.getValues("password") || "Passwords do not match",
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Confirm new password" autoComplete="new-password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" disabled={resetLoading} className="w-full mt-2">
                        {resetLoading ? (
                          <span className="flex items-center gap-2"><span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>Updating...</span>
                        ) : (
                          <span>Update Password</span>
                        )}
                      </Button>
                      {(resetSuccess || resetError) && (
                        <div className="flex justify-center mt-2">
                          {resetSuccess && (
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-100 text-green-700 text-sm font-medium">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                              {resetSuccess}
                            </span>
                          )}
                          {resetError && (
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-100 text-red-700 text-sm font-medium">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                              {resetError}
                            </span>
                          )}
                        </div>
                      )}
                    </form>
                  </Form>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
                            {feature}
                          </Badge>
                        ))}
                        {role.features?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
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
              </div>
            </CardFooter>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default UserPage;
