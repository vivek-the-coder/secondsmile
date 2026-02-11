"use client";

import { useState, useEffect } from "react";
import { adminService } from "@/lib/admin-service";
import { Store } from "@/lib/vendor-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Store as StoreIcon, Check, X, Clock } from "lucide-react";

export default function AdminVendorsPage() {
    const [pendingStores, setPendingStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPending() {
            try {
                const data = await adminService.getPendingStores();
                setPendingStores(data);
            } catch (err) {
                console.error("Error fetching pending stores:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPending();
    }, []);

    const handleAction = async (storeId: string, ownerId: string, action: "approve" | "reject") => {
        setProcessingId(storeId);
        try {
            if (action === "approve") {
                await adminService.approveStore(storeId, ownerId);
            } else {
                await adminService.rejectStore(storeId, ownerId);
            }
            setPendingStores(prev => prev.filter(s => s.id !== storeId));
        } catch (err) {
            console.error("Error processing vendor action:", err);
            alert("Failed to process request");
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Vendor Applications</h1>
                    <p className="text-muted-foreground mt-1">Review and approve new store requests</p>
                </div>
                <Badge variant="secondary" className="px-4 py-1">
                    {pendingStores.length} Pending
                </Badge>
            </div>

            {pendingStores.length === 0 ? (
                <Card className="border-dashed py-20">
                    <CardContent className="flex flex-col items-center justify-center text-center">
                        <Clock className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
                        <h3 className="text-xl font-semibold mb-2">No pending applications</h3>
                        <p className="text-muted-foreground">All store requests have been processed.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    {pendingStores.map((store) => (
                        <Card key={store.id}>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <StoreIcon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{store.storeName}</h3>
                                            <p className="text-sm font-medium text-muted-foreground mb-2">Owner ID: {store.ownerId}</p>
                                            <div className="text-sm space-y-1">
                                                <p><strong>Address:</strong> {store.address}</p>
                                                <p><strong>Contact:</strong> {store.contactNumber}</p>
                                                <p className="text-muted-foreground mt-2 bg-gray-50 p-3 rounded rounded-bl-none italic">
                                                    "{store.description}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col justify-end gap-3 min-w-[140px]">
                                        <Button
                                            onClick={() => handleAction(store.id, store.ownerId, "approve")}
                                            disabled={processingId === store.id}
                                            className="gap-2 bg-green-600 hover:bg-green-700"
                                        >
                                            {processingId === store.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                            Approve
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => handleAction(store.id, store.ownerId, "reject")}
                                            disabled={processingId === store.id}
                                            className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <X className="w-4 h-4" />
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
