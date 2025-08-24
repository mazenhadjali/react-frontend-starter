import { Outlet } from 'react-router-dom';
import AppSidebar from './Sidebar';
import Header from './Header';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';


const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 min-h-screen bg-background">
                <Header />
                <div className="p-1 md:p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    );
};

export default DashboardLayout;
