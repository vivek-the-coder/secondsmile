"use client";

import { useAuth } from "@/contexts/auth-context";
import { orderService } from "@/lib/order-service";
import { Order } from "@/types/order";
import { useEffect, useState } from "react";
import {
    Loader2,
    ShoppingBag,
    Calendar,
    ArrowRight,
    Package,
    Clock,
    CheckCircle2,
    ChevronRight,
    TrendingUp
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && user) {
            async function fetchOrders() {
                try {
                    const data = await orderService.getUserOrders(user.uid);
                    setOrders(data);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setLoading(false);
                }
            }
            fetchOrders();
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);

    if (authLoading || loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <p className="text-muted-foreground font-medium">Tracking your packages...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-600 mb-6 shadow-glow">
                    <ShoppingBag className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-black font-heading text-slate-900 mb-2">My Toy Log</h1>
                <p className="text-slate-500 mb-8 max-w-sm">Please log in to view your order history and active rentals.</p>
                <Button size="lg" className="rounded-full px-10 font-bold shadow-xl shadow-indigo-100" asChild>
                    <Link href="/login">Login Now</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                            <TrendingUp className="w-3 h-3" />
                            Activity History
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black font-heading text-slate-900">My Orders</h1>
                    </div>
                    <Badge variant="outline" className="px-5 py-2 rounded-full font-bold border-indigo-100 bg-white text-indigo-600 shadow-sm">
                        {orders.length} Total Records
                    </Badge>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-100">
                        <Package className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold font-heading mb-2">No toys yet?</h3>
                        <p className="text-slate-500 mb-8 font-medium">Start your first play adventure today!</p>
                        <Button className="rounded-full px-8 font-bold" asChild>
                            <Link href="/toys">Go Shopping</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="group bg-white rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border border-slate-100 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300">
                                <Link href={`/toys/${order.toyId}`} className="relative w-full md:w-32 h-32 md:h-32 rounded-[2rem] overflow-hidden flex-shrink-0 bg-slate-100 group-hover:scale-105 transition-transform duration-500">
                                    <Image src={order.toyImage} alt={order.toyTitle} fill className="object-cover" />
                                </Link>

                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                        <Badge className={cn(
                                            "px-3 py-0.5 rounded-full text-[9px] uppercase font-black border-none",
                                            order.type === "rent" ? "bg-purple-500 text-white" : "bg-emerald-500 text-white"
                                        )}>
                                            {order.type}
                                        </Badge>
                                        <Badge variant="outline" className="px-3 py-0.5 rounded-full text-[9px] font-bold border-slate-100 text-slate-400 capitalize">
                                            {order.status}
                                        </Badge>
                                    </div>
                                    <h3 className="text-2xl font-black font-heading text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                        {order.toyTitle}
                                    </h3>
                                    <p className="text-slate-400 text-xs font-mono">ORDER #TS{order.id.slice(-6).toUpperCase()}</p>

                                    {order.rental && (
                                        <div className="mt-4 inline-flex items-center gap-4 bg-slate-50 px-5 py-2 rounded-full text-xs font-bold text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3 h-3 text-indigo-500" />
                                                {new Date(order.rental.startDate).toLocaleDateString()}
                                            </div>
                                            <ArrowRight className="w-3 h-3 opacity-30" />
                                            <div className="flex items-center gap-2">
                                                {new Date(order.rental.endDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center md:text-right min-w-[150px]">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Total Paid</p>
                                    <p className="text-3xl font-black text-slate-900 mb-4">₹{order.priceBreakdown.totalAmount}</p>
                                    <Button variant="outline" size="sm" className="rounded-full font-bold px-6 h-10 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all" asChild>
                                        <Link href={`/toys/${order.toyId}`} className="gap-2">
                                            Details
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Info Card */}
                <div className="mt-16 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-black font-heading mb-4 px-4">Quality & Safety Guaranteed</h2>
                    <p className="text-slate-400 max-w-xl mx-auto font-medium">
                        Each transaction is protected by our Triple-Check Guarantee.
                        If the toy doesn't match the description, we'll fix it.
                    </p>
                </div>
            </div>
        </div>
    );
}
