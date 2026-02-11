"use client";

import { useState, useEffect } from "react";
import { adminService } from "@/lib/admin-service";
import { Order } from "@/types/order";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, ShoppingBag, Calendar } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await adminService.getAllOrders();
                setOrders(data);
            } catch (err) {
                console.error("Error fetching admin orders:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Order Oversight</h1>
                    <p className="text-muted-foreground mt-1">Monitor all transactions across the platform</p>
                </div>
                <Badge variant="outline" className="px-4 py-1">
                    {orders.length} Total Orders
                </Badge>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <Card key={order.id} className="hover:shadow-sm transition-shadow">
                        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                                    <Image src={order.toyImage} alt={order.toyTitle} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold truncate max-w-[150px]">{order.toyTitle}</p>
                                    <Badge variant="outline" className="text-[10px] capitalize">{order.type}</Badge>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <User className="w-3 h-3" />
                                    <span>Buyer: {order.buyerId.slice(0, 8)}...</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <ShoppingBag className="w-3 h-3" />
                                    <span>Seller: {order.sellerId.slice(0, 8)}...</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <Badge
                                    className={cn(
                                        "capitalize",
                                        order.status === "accepted" || order.status === "completed"
                                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                                            : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                    )}
                                >
                                    {order.status}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1 font-mono">₹{order.priceBreakdown.totalAmount}</p>
                            </div>

                            <div className="text-right">
                                <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground uppercase font-bold">
                                    <Calendar className="w-3 h-3" />
                                    {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'}
                                </div>
                                <p className="text-[10px] font-mono mt-1 opacity-50">#ORD-{order.id.slice(-6).toUpperCase()}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
