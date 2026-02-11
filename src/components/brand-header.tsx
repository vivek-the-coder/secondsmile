"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Package, Heart, Menu, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function BrandHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Main Tier */}
                <div className="flex items-center justify-between h-20 gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 bg-[#5B5FEF] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <Box className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-[#0F172A] font-heading">
                            Toy<span className="text-[#5B5FEF]">Store</span>
                        </span>
                    </Link>

                    {/* Search */}
                    <div className="hidden md:flex flex-1 max-w-xl relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by age, brand, or skill..."
                            className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold focus:ring-[6px] focus:ring-indigo-50 transition-all font-body text-slate-700"
                            suppressHydrationWarning
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <div className="hidden lg:flex items-center gap-6 mr-6 border-r border-slate-100 pr-6 uppercase tracking-widest text-[10px] font-black text-slate-400">
                            <Link href="/sell" className="hover:text-indigo-600 transition-colors">Sell a Toy</Link>
                            <Link href="/orders" className="hover:text-indigo-600 transition-colors">My Orders</Link>
                        </div>

                        <NavIconButton icon={Heart} />
                        <NavIconButton icon={ShoppingCart} badge={2} />
                        <Link href="/profile" className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-[#5B5FEF] hover:text-white transition-all ml-2 border border-slate-100 hover:border-[#5B5FEF]">
                            <User className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </div>
        </header>
    );
}

function NavIconButton({ icon: Icon, badge }: { icon: any, badge?: number }) {
    return (
        <button className="p-2.5 text-slate-500 hover:text-indigo-600 transition-colors relative">
            <Icon className="w-5 h-5" />
            {badge && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-coral-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white bg-[#FB7185]">
                    {badge}
                </span>
            )}
        </button>
    );
}

function NavLink({ label, href, dropdown, highlight }: { label: string, href: string, dropdown?: boolean, highlight?: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "text-[10px] uppercase tracking-[0.2em] font-black transition-colors flex items-center gap-1.5 font-heading",
                highlight ? "text-[#5B5FEF]" : "text-slate-400 hover:text-[#5B5FEF]"
            )}
        >
            {label}
            {dropdown && <span className="opacity-40 text-[8px] mt-0.5">▼</span>}
        </Link>
    );
}
