import { Outlet } from "react-router-dom";
import AppSidebar from "./Sidebar";
import Header from "./Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="flex flex-1 flex-col py-4">
                    <div className="mx-auto w-full px-1 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardLayout;