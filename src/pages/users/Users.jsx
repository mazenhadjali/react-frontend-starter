import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/api/services";
import { MoreHorizontal, Mail, Phone, User, Eye } from "lucide-react";

const Users = () => {
  const { data: users, isLoading, error } = useUsers();

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="px-1 md:px-6 lg:px-8 pt-1 md:pt-6 lg:pt-8 pb-4 md:pb-6 rounded-b-lg md:rounded-b-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">Users Management</h1>
            <p className="text-secondary-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage your users and their permissions</p>
          </div>
          <Button size="lg" className="sm:size-lg" variant="outline" asChild>
            <Link to="/dashboard/users/add">Add New User</Link>
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="w-full bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-3 sm:mb-4 gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">All Users</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              {users ? `${users.length} total users` : 'Loading...'}
            </p>
          </div>

          {error && (
            <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">Error loading users: {error.message}</p>
            </div>
          )}

          {isLoading ? (
            <div className="space-y-3 sm:space-y-4">
              {/* Table Header Skeleton */}
              <div className="hidden lg:grid grid-cols-7 gap-2 sm:gap-4 p-3 sm:p-4 border-b">
                <Skeleton className="h-4 w-16 sm:w-20" />
                <Skeleton className="h-4 w-20 sm:w-24" />
                <Skeleton className="h-4 w-24 sm:w-32" />
                <Skeleton className="h-4 w-20 sm:w-28" />
              </div>
              {/* Mobile/Tablet Skeleton Cards */}
              <div className="lg:hidden space-y-2 sm:space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-3 sm:p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20 sm:w-24" />
                      <Skeleton className="h-4 w-8 sm:w-12" />
                    </div>
                    <Skeleton className="h-4 w-28 sm:w-32" />
                    <Skeleton className="h-4 w-24 sm:w-28" />
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-12 sm:w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 sm:w-20 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop Table Rows Skeleton */}
              <div className="hidden lg:block">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="grid grid-cols-7 gap-2 sm:gap-4 p-3 sm:p-4">
                    <Skeleton className="h-4 w-12 sm:w-16" />
                    <Skeleton className="h-4 w-16 sm:w-20" />
                    <Skeleton className="h-4 w-28 sm:w-36" />
                    <Skeleton className="h-4 w-20 sm:w-24" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Mobile/Tablet Card Layout */}
              <div className="lg:hidden space-y-2 sm:space-y-3">
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <Link key={user.id} to={`/dashboard/users/${user.id}`}>
                      <div className="p-3 sm:p-4 border rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{user.username}</p>
                              <p className="text-xs sm:text-sm text-gray-500">#{user.id}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="flex-shrink-0" onClick={(e) => e.preventDefault()}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-xs sm:text-sm truncate">{user.email}</span>
                          </div>

                          {user.firstName && user.lastName && (
                            <div className="flex items-center gap-2 min-w-0">
                              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-xs sm:text-sm truncate">{user.firstName} {user.lastName}</span>
                            </div>
                          )}

                          {user.phone && (
                            <div className="flex items-center gap-2 min-w-0">
                              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                              <span className="text-xs sm:text-sm truncate">{user.phone}</span>
                            </div>
                          )}

                          <div className="pt-1 sm:pt-2">
                            <p className="text-xs text-gray-500 mb-1">Roles:</p>
                            <div className="flex flex-wrap gap-1">
                              {user.roles && user.roles.length > 0 ? (
                                user.roles.map((role) => (
                                  <span
                                    key={role.id}
                                    className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {role.name}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-400 text-xs">No roles</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <User className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">No users found</p>
                    <Button variant="outline" size="sm">
                      Add your first user
                    </Button>
                  </div>
                )}
              </div>

              {/* Desktop Table Layout */}
              <div className="hidden lg:block overflow-x-auto -mx-3 sm:-mx-4 lg:-mx-6">
                <div className="inline-block min-w-full align-middle px-3 sm:px-4 lg:px-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px] lg:w-[80px]">ID</TableHead>
                        <TableHead className="min-w-[120px] lg:min-w-[150px]">Username</TableHead>
                        <TableHead className="min-w-[160px] lg:min-w-[200px]">Email</TableHead>
                        <TableHead className="min-w-[120px] lg:min-w-[150px]">Full Name</TableHead>
                        <TableHead className="min-w-[110px] lg:min-w-[130px]">Phone</TableHead>
                        <TableHead className="min-w-[100px] lg:min-w-[120px]">Roles</TableHead>
                        <TableHead className="w-[60px] lg:w-[80px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users && users.length > 0 ? (
                        users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium text-sm">#{user.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="h-7 w-7 lg:h-8 lg:w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                  <User className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-primary-600" />
                                </div>
                                <span className="font-medium truncate text-sm lg:text-base">{user.username}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 min-w-0">
                                <Mail className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-gray-400 flex-shrink-0" />
                                <span className="truncate text-sm lg:text-base">{user.email}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="truncate text-sm lg:text-base block">
                                {user.firstName && user.lastName
                                  ? `${user.firstName} ${user.lastName}`
                                  : '-'
                                }
                              </span>
                            </TableCell>
                            <TableCell>
                              {user.phone ? (
                                <div className="flex items-center gap-2 min-w-0">
                                  <Phone className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-gray-400 flex-shrink-0" />
                                  <span className="truncate text-sm lg:text-base">{user.phone}</span>
                                </div>
                              ) : (
                                <span className="text-sm lg:text-base">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1 max-w-[100px] lg:max-w-[120px]">
                                {user.roles && user.roles.length > 0 ? (
                                  user.roles.slice(0, 2).map((role) => (
                                    <span
                                      key={role.id}
                                      className="inline-flex items-center px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 truncate"
                                    >
                                      {role.name}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-gray-400 text-xs lg:text-sm">No roles</span>
                                )}
                                {user.roles && user.roles.length > 2 && (
                                  <span className="text-xs text-gray-500">+{user.roles.length - 2}</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Link to={`/dashboard/users/${user.id}`}>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            <div className="flex flex-col items-center gap-2">
                              <User className="h-8 w-8 text-gray-400" />
                              <p className="text-gray-500">No users found</p>
                              <Button variant="outline" size="sm">
                                Add your first user
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default Users;
