import { AdminGuard } from "@/components/admin-guard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminGuard>
            <div className="bg-gray-50/50 min-h-screen">
                {children}
            </div>
        </AdminGuard>
    );
}
