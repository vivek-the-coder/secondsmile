"use client";

import { useState, useEffect } from "react";
import { adminService } from "@/lib/admin-service";
import { Card, CardContent } from "@/components/ui/card";
import {
    Users,
    Store,
    Package,
    ShoppingCart,
    Loader2,
    ArrowRight,
    ShieldCheck,
    TrendingUp,
    Activity,
    ArrowUpRight,
    Settings,
    Bell
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<{
        totalUsers: number;
        totalVendors: number;
        totalListings: number;
        totalOrders: number;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await adminService.getPlatformStats();
                setStats(data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <p className="text-muted-foreground font-medium">Syncing marketplace data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h1 className="text-4xl font-black font-heading text-slate-900 tracking-tight">Command Center</h1>
                        </div>
                        <p className="text-slate-500 font-medium">Platform-wide overview and administrative controls.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-xl w-12 h-12 p-0 bg-white">
                            <Bell className="w-5 h-5 text-slate-400" />
                        </Button>
                        <Button variant="outline" className="rounded-xl w-12 h-12 p-0 bg-white">
                            <Settings className="w-5 h-5 text-slate-400" />
                        </Button>
                        <div className="h-8 w-[1px] bg-slate-200 mx-2" />
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Admin Session</p>
                            <p className="text-sm font-bold text-slate-900">Platform Mgr</p>
                        </div>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <AdminStatCard icon={Users} label="Total Users" value={stats?.totalUsers || 0} color="indigo" growth="+12%" />
                    <AdminStatCard icon={Store} label="Approved Stores" value={stats?.totalVendors || 0} color="emerald" growth="+5%" />
                    <AdminStatCard icon={Package} label="Active Inventory" value={stats?.totalListings || 0} color="orange" growth="+18%" />
                    <AdminStatCard icon={ShoppingCart} label="Marketplace Orders" value={stats?.totalOrders || 0} color="purple" growth="+24%" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Activity Feed Placeholder */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-5 h-5 text-indigo-600" />
                                    <h3 className="text-xl font-black font-heading text-slate-900">System Activity</h3>
                                </div>
                                <Button variant="ghost" className="text-xs font-bold text-indigo-600">View Logs</Button>
                            </div>
                            <div className="p-8 space-y-6">
                                <ActivityRow icon={Users} title="New user registered" sub="User ID: ...f8a2" time="2m ago" />
                                <ActivityRow icon={Store} title="Vendor application received" sub="Store: Galaxy Blocks" time="15m ago" />
                                <ActivityRow icon={ShoppingCart} title="New order placed" sub="Order #TS_9210" time="1h ago" />
                                <ActivityRow icon={Package} title="Listing flagged for review" sub="Item: Sharp Edged Blade" time="4h ago" alert />
                            </div>
                        </Card>
                    </div>

                    {/* Quick Management */}
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-4">Management Modules</h3>
                        <Link href="/admin/vendors" className="block group">
                            <Card className="bg-white border-none shadow-sm rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            <Store className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900">Vendor Apps</p>
                                            <p className="text-xs text-slate-400 font-medium tracking-tight">Moderate registrations</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Card>
                        </Link>

                        <Link href="/admin/listings" className="block group">
                            <Card className="bg-white border-none shadow-sm rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                            <Package className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900">Listings Mod</p>
                                            <p className="text-xs text-slate-400 font-medium tracking-tight">Audit and edit toys</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Card>
                        </Link>

                        <Link href="/admin/orders" className="block group">
                            <Card className="bg-white border-none shadow-sm rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                            <ShoppingCart className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900">Order oversight</p>
                                            <p className="text-xs text-slate-400 font-medium tracking-tight">All marketplace history</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AdminStatCard({ icon: Icon, label, value, color, growth }: { icon: any, label: string, value: number, color: string, growth: string }) {
    const variants = {
        indigo: "bg-indigo-600",
        emerald: "bg-emerald-500",
        orange: "bg-orange-500",
        purple: "bg-purple-600"
    };

    return (
        <Card className="bg-white border-none shadow-sm rounded-[2.5rem] p-8 overflow-hidden relative group hover:shadow-2xl transition-all duration-500">
            <div className="relative z-10">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", variants[color as keyof typeof variants])}>
                    <Icon className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{label}</p>
                <div className="flex items-end justify-between">
                    <p className="text-4xl font-black text-slate-900">{value}</p>
                    <div className="flex items-center gap-1 text-emerald-500 font-black text-xs bg-emerald-50 px-2 py-1 rounded-full">
                        <ArrowUpRight className="w-3 h-3" />
                        {growth}
                    </div>
                </div>
            </div>
            <div className={cn("absolute -right-4 -bottom-4 w-32 h-32 opacity-[0.03] group-hover:scale-125 transition-transform duration-700", variants[color as keyof typeof variants] + " rounded-full")} />
        </Card>
    );
}

function ActivityRow({ icon: Icon, title, sub, time, alert = false }: { icon: any, title: string, sub: string, time: string, alert?: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", alert ? "bg-red-50 text-red-500" : "bg-slate-50 text-slate-400")}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <p className={cn("text-sm font-bold", alert ? "text-red-600" : "text-slate-900")}>{title}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{sub}</p>
                </div>
            </div>
            <p className="text-[10px] font-black text-slate-300 uppercase">{time}</p>
        </div>
    );
}

