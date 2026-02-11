"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, ChevronDown, Package, Heart, RefreshCw, BarChart3, HelpCircle, MapPin } from "lucide-react";

export function TopBar() {
    return (
        <div className="bg-[#1A1A1A] text-white py-2 px-4 text-[11px] font-bold">
            <div className="container mx-auto flex justify-between items-center max-w-7xl">
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-[#7C9DFF] transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                        <MapPin className="w-3 h-3" />
                        Order Tracking
                    </Link>
                    <Link href="#" className="hover:text-[#7C9DFF] transition-colors flex items-center gap-1.5 uppercase tracking-wider">
                        <HelpCircle className="w-3 h-3" />
                        Help Center
                    </Link>
                </div>
                <div className="flex gap-4 divide-x divide-white/20">
                    <div className="flex gap-4 pr-4">
                        <Link href="#" className="hover:text-[#7C9DFF] transition-colors uppercase tracking-wider">Become a Seller</Link>
                        <Link href="#" className="hover:text-[#7C9DFF] transition-colors uppercase tracking-wider">Gift Cards</Link>
                    </div>
                    <div className="pl-4">
                        <Link href="#" className="hover:text-[#7C9DFF] transition-colors uppercase tracking-wider">English</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MainTier() {
    return (
        <div className="bg-white py-4 px-4 border-b border-slate-100">
            <div className="container mx-auto max-w-7xl flex items-center gap-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-10 h-10 bg-[#7C9DFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                        <Package className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black font-heading tracking-tight text-[#222222]">
                        Kee<span className="text-[#7C9DFF]">dos</span>
                    </span>
                </Link>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl relative">
                    <div className="flex h-12 w-full">
                        <input
                            type="text"
                            placeholder="I'm looking for..."
                            className="flex-1 bg-slate-50 border-none rounded-l-2xl px-6 text-sm font-bold focus:ring-2 focus:ring-[#7C9DFF] text-slate-700"
                            suppressHydrationWarning
                        />
                        <div className="bg-slate-50 border-none border-l h-full flex items-center px-4 text-xs font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-600 transition-colors">
                            Select Category
                            <ChevronDown className="ml-2 w-3 h-3" />
                        </div>
                        <button className="bg-[#7C9DFF] text-white px-8 rounded-r-2xl h-full flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-blue-50 active:scale-95">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    <NavAction icon={RefreshCw} badge={0} />
                    <NavAction icon={Heart} badge={0} />
                    <NavAction icon={ShoppingCart} badge={2} color="#7C9DFF" />
                    <div className="ml-4 flex items-center gap-3 pl-4 border-l border-slate-100">
                        <div className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 cursor-pointer hover:bg-[#7C9DFF] hover:text-white transition-all">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="hidden lg:block text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account</p>
                            <p className="text-[13px] font-black text-slate-900">Sign In</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function NavTier() {
    return (
        <div className="bg-white px-4 border-b border-slate-100 overflow-x-auto no-scrollbar">
            <div className="container mx-auto max-w-7xl flex items-center h-14">
                <div className="bg-[#1A1A1A] text-white h-full px-8 flex items-center gap-3 font-black text-xs uppercase tracking-widest cursor-pointer group">
                    <Menu className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    Browse Categories
                    <ChevronDown className="w-3 h-3 ml-2 group-hover:translate-y-0.5 transition-transform" />
                </div>
                <div className="flex items-center gap-8 ml-10">
                    <NavLink label="Home" active />
                    <NavLink label="Products" dropdown />
                    <NavLink label="Flash Sales" />
                    <NavLink label="Special offers" />
                    <NavLink label="Shop Page" dropdown />
                    <NavLink label="User Profile" dropdown />
                    <NavLink label="Contact Us" />
                </div>
                <div className="ml-auto flex items-center gap-2 text-slate-400">
                    <Package className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Recently Viewed</span>
                </div>
            </div>
        </div>
    );
}

function NavAction({ icon: Icon, badge, color }: { icon: any, badge: number, color?: string }) {
    return (
        <div className="relative p-3 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors group">
            <Icon className={cn("w-6 h-6", color && `text-[${color}]`)} style={color ? { color } : {}} />
            {badge > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#FF7C7C] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {badge}
                </span>
            )}
        </div>
    );
}

function NavLink({ label, active, dropdown }: { label: string, active?: boolean, dropdown?: boolean }) {
    return (
        <Link
            href="#"
            className={cn(
                "flex items-center gap-1.5 text-xs font-black uppercase tracking-widest transition-colors",
                active ? "text-[#7C9DFF]" : "text-slate-500 hover:text-[#7C9DFF]"
            )}
        >
            {label}
            {dropdown && <ChevronDown className="w-3 h-3 opacity-30" />}
        </Link>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
