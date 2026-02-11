"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const { profile, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && profile?.role !== "admin") {
            router.replace("/");
        }
    }, [profile, loading, router]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Authenticating Admin...</p>
            </div>
        );
    }

    if (profile?.role !== "admin") {
        return null;
    }

    return <>{children}</>;
}
