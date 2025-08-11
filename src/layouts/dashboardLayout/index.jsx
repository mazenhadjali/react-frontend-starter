import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';


const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-gradient-to-br from-secondary-50 via-primary-50/30 to-accent-50/50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
