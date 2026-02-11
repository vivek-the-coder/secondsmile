"use client";

import Image from "next/image";
import Link from "next/link";
import { Toy } from "@/types/toy";
import { Star, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhimsyProductCard({ toy, bgColor }: { toy: Toy, bgColor?: string }) {
    const isRental = toy.type === "rental";

    return (
        <div
            className="group relative rounded-[20px] p-[14px] transition-all duration-500 hover:-translate-y-[6px] border border-white/5 active:translate-y-0"
            style={{
                background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.15), rgba(255,255,255,0.02)), #1F1F1F",
                boxShadow: "0 12px 30px rgba(0,0,0,0.35), 0 2px 0 rgba(255,255,255,0.03) inset"
            }}
        >
            <Link href={`/toys/${toy.id}`} className="block">
                {/* 1st Layer: Image Panel */}
                <div
                    className={cn(
                        "relative aspect-square rounded-[14px] overflow-hidden flex items-center justify-center p-6 mb-[14px] transition-all duration-500 group-hover:scale-[1.02]",
                        !bgColor && "bg-[#262626]"
                    )}
                    style={bgColor ? { backgroundColor: bgColor } : {}}
                >
                    {/* Inner depth placeholder */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-1/2 h-1/2 bg-white/5 rounded-full blur-2xl animate-pulse group-hover:bg-white/10 transition-colors"></div>

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-[#F4B400] text-[#121212] text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        {isRental ? "Rent" : "New"}
                    </div>
                </div>
            </Link>

            {/* 2nd Layer: Info Panel */}
            <div className="text-center px-2 pb-2">
                <h3 className="text-[14px] font-medium font-heading uppercase tracking-[0.5px] mb-2 truncate transition-colors group-hover:text-white" style={{ color: "#CFCFCF" }}>
                    {toy.title}
                </h3>
                <p className="text-2xl font-bold tracking-tight" style={{ color: "#FFC83D" }}>
                    ₹{toy.price || toy.rentalPricePerDay}
                </p>
            </div>
        </div>
    );
}
