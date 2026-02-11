"use client";

import { Toy } from "@/types/toy";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToyCard({ toy }: { toy: Toy }) {
    const isRental = toy.type === "rental";
    const isNew = toy.type === "new";

    // Brand Palette: Indigo, Coral, Yellow
    const colorMap = {
        new: "bg-emerald-50 text-emerald-600 border-emerald-100",
        rental: "bg-[#EEF2FF] text-[#5B5FEF] border-indigo-100",
        used: "bg-orange-50 text-orange-600 border-orange-100"
    };

    const typeKey = (toy.type as "new" | "rental" | "used") || "used";
    const badgeClass = colorMap[typeKey];
    const badgeText = isRental ? "RENT" : isNew ? "NEW" : "USED";

    return (
        <div className="group bg-white rounded-[2.5rem] p-5 border border-slate-100 hover:shadow-[0_32px_64px_-16px_rgba(91,95,239,0.12)] hover:-translate-y-2 transition-all duration-500 h-full flex flex-col active:scale-[0.98]">
            <Link href={`/toys/${toy.id}`}>
                <div className="relative aspect-[4/5] bg-slate-50 rounded-[2rem] mb-6 overflow-hidden flex items-center justify-center border border-slate-50">
                    <Image
                        src={(toy.images && toy.images[0]) || (toy as any).image || "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1"}
                        alt={toy.title}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Badge */}
                    <div className="absolute top-5 left-5">
                        <span className={cn(
                            "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm",
                            badgeClass
                        )}>
                            {badgeText}
                        </span>
                    </div>

                    {/* Wishlist */}
                    <button className="absolute top-5 right-5 w-11 h-11 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-300 hover:text-[#FB7185] transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 border border-slate-50">
                        <Heart className="w-5 h-5" />
                    </button>

                    {/* Quick View Button (hover only) */}
                    <div className="absolute inset-x-5 bottom-5 translate-y-24 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-full py-4 bg-white/95 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-center shadow-2xl border border-white/50 text-slate-900">
                            Quick View
                        </div>
                    </div>
                </div>
            </Link>

            <div className="flex-1 flex flex-col">
                <Link href={`/toys/${toy.id}`}>
                    <h3 className="text-lg font-black text-slate-900 mb-3 truncate group-hover:text-[#5B5FEF] transition-colors font-heading tracking-tight">
                        {toy.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-2.5 mb-5">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "w-3.5 h-3.5",
                                    i < Math.floor(toy.rating) ? "text-[#FDBA2D] fill-current" : "text-slate-100"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-slate-300">({toy.rating})</span>
                </div>

                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <p className="text-[9px] font-black text-slate-400 font-heading uppercase tracking-[0.2em] mb-1.5">
                            {isRental ? "From" : "Price"}
                        </p>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{toy.price || toy.rentalPricePerDay}</span>
                            {isRental && <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">/ day</span>}
                        </div>
                    </div>

                    <button className="w-14 h-14 bg-[#5B5FEF] rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-100 hover:bg-[#4A4ED1] transition-all transform active:scale-95 group/btn">
                        <ShoppingCart className="w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
