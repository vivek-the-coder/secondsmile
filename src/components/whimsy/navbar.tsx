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
                        Whimsy
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <div key={link.name} className="relative group">
                            <Link
                                href={link.href}
                                className="flex items-center gap-1 text-[15px] font-bold text-[#1C1C1C] hover:text-white transition-colors uppercase tracking-wide"
                            >
                                {link.name}
                                {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    <div className="flex items-center gap-2 border-r border-black/10 pr-6">
                        <button className="p-2 text-[#1C1C1C] hover:bg-black/5 rounded-full transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-[#1C1C1C] hover:bg-black/5 rounded-full transition-colors">
                            <ShoppingBag className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-[#1C1C1C] hover:bg-black/5 rounded-full transition-colors">
                            <User className="w-5 h-5" />
                        </button>
                    </div>
                    <Link
                        href="/shop"
                        className="bg-[#1C1C1C] text-white px-8 py-3 rounded-full font-bold text-[13px] uppercase tracking-wider hover:bg-black hover:-translate-y-0.5 transition-all shadow-lg"
                    >
                        Shop Now
                    </Link>
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
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-2xl font-black text-[#1C1C1C] uppercase tracking-tight border-b border-black/10 pb-4"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-auto mb-12 flex flex-col gap-4">
                        <Link href="/about" className="text-[#1C1C1C] font-medium">About Us</Link>
                        <Link href="/contact" className="text-[#1C1C1C] font-medium">Contact</Link>
                        <Link href="/returns" className="text-[#1C1C1C] font-medium">Returns</Link>
                        <Link href="/faq" className="text-[#1C1C1C] font-medium">FAQs</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
