"use client";

import { useState, useEffect } from "react";
import { FiltersSidebar } from "@/components/filters-sidebar";
import { ToyCard } from "@/components/toy-card";
import { toyService } from "@/lib/toy-service";
import { Toy } from "@/types/toy";
import { Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function ToysListingPage() {
    const [toys, setToys] = useState<Toy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchToys() {
            try {
                const data = await toyService.getAllToys();
                setToys(data);
            } catch (error) {
                console.error("Error fetching toys:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchToys();
    }, []);

    return (
        <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-black font-heading text-slate-900 mb-6 tracking-tight leading-tight">
                            Find the Perfect <span className="text-[#5B5FEF]">Playmate</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed font-body">
                            Explore thousands of toys for every age, interest, and occasion.
                            Buy new, find pre-loved gems, or rent for temporary fun.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="px-5 py-2.5 rounded-full font-bold border-indigo-100 bg-white text-indigo-600 shadow-sm">
                            {toys.length} Toys Available
                        </Badge>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 flex-shrink-0">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <h3 className="text-lg font-bold font-heading mb-6 flex items-center gap-2">
                                    <Search className="w-5 h-5 text-indigo-600" />
                                    Quick Search
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2 block">Keywords</Label>
                                        <Input placeholder="LEGO, Barbie..." className="rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all h-12" />
                                    </div>
                                </div>
                            </div>
                            <FiltersSidebar />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="aspect-[4/5] bg-slate-100 rounded-[2.5rem] animate-pulse" />
                                ))}
                            </div>
                        ) : toys.length === 0 ? (
                            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                                <Package className="w-16 h-16 text-slate-200 mx-auto mb-6 opacity-50" />
                                <h3 className="text-2xl font-bold font-heading text-slate-900 mb-2">No toys found</h3>
                                <p className="text-slate-500 font-medium">Try adjusting your filters or search keywords.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {toys.map((toy) => (
                                    <ToyCard key={toy.id} toy={toy} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
