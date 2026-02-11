"use client";

import { use, useEffect, useState } from "react";
import { vendorService, Store } from "@/lib/vendor-service";
import { Toy } from "@/types/toy";
import { ToyCard } from "@/components/toy-card";
import { Loader2, Store as StoreIcon, MapPin, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function StorePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [store, setStore] = useState<Store | null>(null);
    const [products, setProducts] = useState<Toy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStoreData() {
            try {
                const storeData = await vendorService.getStoreById(id);
                if (storeData) {
                    setStore(storeData);
                    const productsData = await vendorService.getStoreProducts(storeData.ownerId);
                    setProducts(productsData);
                }
            } catch (error) {
                console.error("Error fetching store data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStoreData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Opening store shelf...</p>
            </div>
        );
    }

    if (!store) {
        notFound();
    }

    return (
        <div className="pb-20">
            {/* Store Header */}
            <div className="bg-white border-b overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent"></div>
                <div className="container mx-auto px-4 -mt-16 pb-10">
                    <div className="flex flex-col md:flex-row gap-6 items-end">
                        <div className="w-32 h-32 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center text-primary">
                            <StoreIcon className="w-12 h-12" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{store.storeName}</h1>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {store.address}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    {store.contactNumber}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button className="gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Contact Seller
                            </Button>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    <div className="max-w-3xl">
                        <h2 className="text-lg font-bold mb-2">About our Store</h2>
                        <p className="text-muted-foreground">{store.description}</p>
                    </div>
                </div>
            </div>

            {/* Store Products */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Store Products ({products.length})</h2>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl">
                        <p className="text-muted-foreground italic">This store hasn't listed any products yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ToyCard key={product.id} toy={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
