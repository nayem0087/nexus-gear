
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import { DashboardSidebar } from '@/components/DashboardSidebar';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar />
            <main className="flex-1">
                {children}
                <Toaster position="top-center" reverseOrder={false} />
            </main>
        </div>
    );
};

export default DashboardLayout;