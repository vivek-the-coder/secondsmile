"use client";

import { useState, useEffect } from "react";
import { adminService } from "@/lib/admin-service";
import { Toy } from "@/types/toy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, ExternalLink, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminListingsPage() {
    const [listings, setListings] = useState<Toy[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchListings() {
            try {
                const data = await adminService.getAllListings();
                setListings(data);
            } catch (err) {
                console.error("Error fetching listings:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchListings();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this listing? This action cannot be undone.")) return;

        setDeletingId(id);
        try {
            await adminService.deleteListing(id);
            setListings(prev => prev.filter(l => l.id !== id));
        } catch (err) {
            console.error("Error deleting listing:", err);
            alert("Failed to delete listing");
        } finally {
            setDeletingId(null);
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
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Listings Moderation</h1>
                    <p className="text-muted-foreground mt-1">Manage and moderate all platform toys</p>
                </div>
                <Badge variant="secondary" className="px-4 py-1">
                    {listings.length} Total Items
                </Badge>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Owner</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listings.map((item) => (
                                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                                                    <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold max-w-[200px] truncate">{item.title}</p>
                                                    <p className="text-xs text-muted-foreground font-mono">ID: {item.id.slice(0, 8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-muted-foreground uppercase">{item.sellerType}</span>
                                                <span className="text-xs font-mono">{item.ownerId.slice(0, 10)}...</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className="capitalize">{item.type}</Badge>
                                        </td>
                                        <td className="px-6 py-4 font-bold">₹{item.price || item.rentalPricePerDay}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/toys/${item.id}`} target="_blank">
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleDelete(item.id)}
                                                disabled={deletingId === item.id}
                                            >
                                                {deletingId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
