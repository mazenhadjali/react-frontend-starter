import { Button } from "@/components/ui/button";

const Users = () => {

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 -mx-6 -mt-6 px-6 pt-6 pb-6 rounded-b-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Users Management</h1>
            <p className="text-secondary-600 mt-2">Manage your users and their permissions</p>
          </div>
          <Button size="lg" variant="outline">
            Add New User
          </Button>
        </div>
      </div>

    </div>
  );
};

export default Users;
