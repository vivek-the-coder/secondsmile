"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Shop Toys", href: "/shop", hasDropdown: true },
    { name: "By Age", href: "/age", hasDropdown: true },
    { name: "Categories", href: "/categories" },
    { name: "Best Sellers", href: "/best-sellers" },
    { name: "New Arrivals", href: "/new" },
    { name: "Gifts", href: "/gifts" },
];

export function WhimsyNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F4B400] shadow-sm transition-all duration-300">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group z-50">
                    <span className="text-3xl font-black font-luckiest text-white tracking-[-0.05em] uppercase drop-shadow-sm group-hover:scale-105 transition-transform">
                        SecondSmile
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    <Link href="/shop" className="text-[15px] font-bold text-[#1C1C1C] hover:text-white transition-colors uppercase tracking-wide">Browse Toys</Link>
                    <Link href="/rent-toys" className="text-[15px] font-bold text-[#1C1C1C] hover:text-white transition-colors uppercase tracking-wide">Rent Toys</Link>
                    <Link href="/sell" className="text-[15px] font-bold text-[#1C1C1C] hover:text-white transition-colors uppercase tracking-wide">Sell a Toy</Link>
                    <Link href="/how-it-works" className="text-[15px] font-bold text-[#1C1C1C] hover:text-white transition-colors uppercase tracking-wide">How It Works</Link>
                    <Link href="/safety" className="text-[15px] font-bold text-[#1C1C1C] hover:text-white transition-colors uppercase tracking-wide">Safety</Link>
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    <div className="flex items-center gap-2 border-r border-black/10 pr-6">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                            <input
                                type="text"
                                placeholder="Find toys near you..."
                                className="bg-white/20 placeholder-black/50 text-[#1C1C1C] rounded-full pl-10 pr-4 py-2 focus:outline-none focus:bg-white/30 transition-all font-bold text-sm w-48"
                                suppressHydrationWarning
                            />
                        </div>
                    </div>
                    <Link
                        href="/sell"
                        className="bg-[#1C1C1C] text-white px-8 py-3 rounded-full font-bold text-[13px] uppercase tracking-wider hover:bg-black hover:-translate-y-0.5 transition-all shadow-lg"
                    >
                        List a Toy
                    </Link>
                    <div className="flex items-center gap-2">
                        <User className="w-6 h-6 text-[#1C1C1C] cursor-pointer hover:text-white transition-colors" />
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden z-50 p-2 text-[#1C1C1C]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                <div className={cn(
                    "fixed inset-0 bg-[#F4B400] z-40 flex flex-col pt-32 px-6 transition-transform duration-300 lg:hidden",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    <div className="flex flex-col gap-6">
                        <Link href="/shop" onClick={() => setIsOpen(false)} className="text-2xl font-black text-[#1C1C1C] uppercase tracking-tight border-b border-black/10 pb-4">Browse Toys</Link>
                        <Link href="/rent-toys" onClick={() => setIsOpen(false)} className="text-2xl font-black text-[#1C1C1C] uppercase tracking-tight border-b border-black/10 pb-4">Rent Toys</Link>
                        <Link href="/sell" onClick={() => setIsOpen(false)} className="text-2xl font-black text-[#1C1C1C] uppercase tracking-tight border-b border-black/10 pb-4">Sell a Toy</Link>
                        <Link href="/how-it-works" onClick={() => setIsOpen(false)} className="text-2xl font-black text-[#1C1C1C] uppercase tracking-tight border-b border-black/10 pb-4">How It Works</Link>
                        <Link href="/safety" onClick={() => setIsOpen(false)} className="text-2xl font-black text-[#1C1C1C] uppercase tracking-tight border-b border-black/10 pb-4">Safety</Link>
                    </div>
                    <div className="mt-auto mb-12">
                        <Link href="/sell" className="block w-full text-center bg-[#1C1C1C] text-white px-8 py-4 rounded-full font-bold text-lg uppercase tracking-wider">List a Toy</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
