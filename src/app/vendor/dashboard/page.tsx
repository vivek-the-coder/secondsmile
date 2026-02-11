"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { vendorService, Store } from "@/lib/vendor-service";
import { toyService } from "@/lib/toy-service";
import { orderService } from "@/lib/order-service";
import { Toy } from "@/types/toy";
import { Order } from "@/types/order";
import {
    Loader2,
    Package,
    ShoppingBag,
    PlusCircle,
    Store as StoreIcon,
    Clock,
    Calendar,
    ArrowRight,
    User as UserIcon,
    TrendingUp,
    LayoutDashboard,
    ChevronRight,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function VendorDashboardPage() {
    const { user, profile, loading: authLoading } = useAuth();
    const router = useRouter();

    const [store, setStore] = useState<Store | null>(null);
    const [products, setProducts] = useState<Toy[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && (!user || profile?.role !== "vendor")) {
            router.push("/");
        }

        if (user?.uid && profile?.role === "vendor") {
            async function fetchData() {
                try {
                    const [storeData, productsData, receivedOrders] = await Promise.all([
                        vendorService.getStoreByOwner(user!.uid),
                        vendorService.getStoreProducts(user!.uid),
                        orderService.getVendorOrders(user!.uid)
                    ]);

                    setStore(storeData);
                    setProducts(productsData);
                    setOrders(receivedOrders);
                } catch (error) {
                    console.error("Error fetching vendor data:", error);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, profile, authLoading, router]);

    if (authLoading || loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <p className="text-muted-foreground font-medium">Preparing your store headquarters...</p>
            </div>
        );
    }

    const totalEarnings = orders.reduce((sum, o) => sum + (o.priceBreakdown.totalAmount || 0), 0);

    return (
        <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white rounded-[2rem] shadow-xl shadow-indigo-50 border border-slate-100 flex items-center justify-center text-indigo-600">
                            <StoreIcon className="w-10 h-10" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-3xl md:text-4xl font-black font-heading text-slate-900">{store?.storeName || "Vendor Dashboard"}</h1>
                                <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full font-bold px-3">Active Store</Badge>
                            </div>
                            <p className="text-slate-500 font-medium">Manage your inventory, track revenue, and grow your business.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="rounded-full px-8 font-bold bg-white h-12" asChild>
                            <Link href={`/store/${store?.id}`}>Public Preview</Link>
                        </Button>
                        <Button className="rounded-full px-10 font-black h-12 shadow-xl shadow-indigo-100" asChild>
                            <Link href="/sell" className="gap-2">
                                <PlusCircle className="w-4 h-4" />
                                Post Listing
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard icon={TrendingUp} label="Total Revenue" value={`₹${totalEarnings}`} color="indigo" />
                    <StatCard icon={ShoppingBag} label="Orders Received" value={orders.length.toString()} color="emerald" />
                    <StatCard icon={Package} label="Active Listings" value={products.length.toString()} color="orange" />
                    <StatCard icon={UserIcon} label="Customer Rating" value="5.0 ★" color="yellow" />
                </div>

                <Tabs defaultValue="products" className="space-y-10">
                    <div className="flex items-center justify-center md:justify-start">
                        <TabsList className="bg-white border rounded-full p-1.5 h-auto space-x-1 shadow-sm">
                            <TabsTrigger value="products" className="rounded-full px-8 py-2.5 font-bold data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all">
                                My Inventory
                            </TabsTrigger>
                            <TabsTrigger value="orders" className="rounded-full px-8 py-2.5 font-bold data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all">
                                Incoming Orders
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="products" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="text-xl font-black font-heading text-slate-900">Active Listings</h3>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                    <input placeholder="Search products..." className="pl-12 pr-6 py-2 bg-slate-50 rounded-full text-xs font-bold border-none" />
                                </div>
                            </div>

                            {products.length === 0 ? (
                                <div className="text-center py-32 bg-slate-50/50">
                                    <Package className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                                    <p className="text-slate-500 font-bold mb-6">No products found in your catalog.</p>
                                    <Button variant="outline" className="rounded-full px-8" asChild>
                                        <Link href="/sell">Add your first product</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Product Detail</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {products.map((product) => (
                                                <tr key={product.id} className="group hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-white shadow-sm">
                                                                <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                                                            </div>
                                                            <div>
                                                                <span className="font-black text-slate-900 block group-hover:text-indigo-600 transition-colors">{product.title}</span>
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{product.category}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <Badge variant="outline" className="capitalize px-3 py-1 rounded-full font-bold text-[10px] border-slate-100 bg-white">
                                                            {product.type}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-lg font-black text-slate-900">₹{product.price || product.rentalPricePerDay}</p>
                                                        {product.type === "rental" && <p className="text-[10px] font-bold text-slate-400">per day</p>}
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <Button variant="ghost" size="sm" className="rounded-full font-black text-indigo-600 hover:bg-indigo-50 px-4">Manage</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="orders" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-6">
                            {orders.length === 0 ? (
                                <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
                                    <Clock className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold font-heading text-slate-900 mb-2">No orders yet</h3>
                                    <p className="text-slate-500 font-medium">New customer requests will show up right here.</p>
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <Card key={order.id} className="bg-white border-none shadow-sm rounded-[2.5rem] p-8 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                            <div className="flex items-center gap-6 flex-1">
                                                <div className="relative w-24 h-24 rounded-[1.5rem] overflow-hidden shadow-inner bg-slate-50 border border-slate-100">
                                                    <Image src={order.toyImage} alt={order.toyTitle} fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <Badge className={cn(
                                                            "px-3 py-0.5 rounded-full text-[9px] uppercase font-black border-none",
                                                            order.type === "rent" ? "bg-purple-500 text-white" : "bg-emerald-500 text-white"
                                                        )}>
                                                            {order.type}
                                                        </Badge>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">#ORD_{order.id.slice(0, 6).toUpperCase()}</span>
                                                    </div>
                                                    <h4 className="text-xl font-black font-heading text-slate-900 mb-2">{order.toyTitle}</h4>
                                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                                        <div className="flex items-center gap-1.5">
                                                            <UserIcon className="w-3 h-3" />
                                                            UID: {order.buyerId.slice(0, 8)}
                                                        </div>
                                                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-3 h-3" />
                                                            Just now
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {order.rental && (
                                                <div className="inline-flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl text-xs font-black text-slate-700">
                                                    <Calendar className="w-4 h-4 text-indigo-500" />
                                                    <span>{new Date(order.rental.startDate).toLocaleDateString()}</span>
                                                    <ArrowRight className="w-4 h-4 opacity-20" />
                                                    <span>{new Date(order.rental.endDate).toLocaleDateString()}</span>
                                                </div>
                                            )}

                                            <div className="text-center md:text-right px-8 py-4 bg-indigo-50/50 rounded-3xl min-w-[160px]">
                                                <p className="text-[10px] text-indigo-600 uppercase font-black tracking-widest mb-1">Total Earnings</p>
                                                <p className="text-2xl font-black text-indigo-600">₹{order.priceBreakdown.totalAmount}</p>
                                            </div>

                                            <div className="flex flex-col gap-2 w-full md:w-auto">
                                                <Button className="rounded-full font-black min-w-[120px]">Confirm</Button>
                                                <Button variant="ghost" className="rounded-full font-bold text-slate-400 hover:text-slate-600">Details</Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
    const variants = {
        indigo: "bg-indigo-600 text-white shadow-indigo-100",
        emerald: "bg-emerald-500 text-white shadow-emerald-100",
        orange: "bg-orange-500 text-white shadow-orange-100",
        yellow: "bg-yellow-400 text-white shadow-yellow-100"
    };

    return (
        <Card className="bg-white border-none shadow-sm rounded-[2.5rem] p-8 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
                <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl", variants[color as keyof typeof variants])}>
                    <Icon className="w-8 h-8" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{label}</p>
                <p className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{value}</p>
            </div>
        </Card>
    );
}
