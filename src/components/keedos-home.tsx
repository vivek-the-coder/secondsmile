"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Star,
    ShoppingCart,
    Play,
    Mail,
    Instagram,
    Facebook,
    Twitter,
    Linkedin,
    Package,
    Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ToyCard } from "./toy-card";

// --- Hero Section (Legacy Keedos - Should be replaced by BrandHero) ---
export function KeedosHero() {
    return (
        <section className="relative pt-44 pb-32 overflow-hidden bg-gradient-to-b from-[#FFF5F5] via-[#FFFCF0] to-white">
            <div className="container mx-auto max-w-7xl px-4 text-center relative z-10">
                <h1 className="text-4xl md:text-7xl font-black font-heading text-[#1A1A1A] mb-4 tracking-tight">
                    Iconic Supersonic
                </h1>
                <p className="text-slate-500 font-medium mb-12 max-w-xl mx-auto font-body">
                    Design your perfect play world with Keedos toy store catalogs.
                </p>
                <Link href="/toys" className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#5B5FEF] hover:shadow-xl transition-all active:scale-95 group">
                    Shop Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}

// --- Category Grid (Legacy Keedos - Should be replaced by BrandCategoryGrid) ---
export function KeedosCategoryGrid() {
    const categories = [
        { name: "Indoor Play", image: "https://images.unsplash.com/photo-1594498653385-d5172c532c00" },
        { name: "Games & Puzzles", image: "https://images.unsplash.com/photo-1585366119957-e556f403e44c" },
        { name: "Blocks", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b" },
    ];

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black font-heading text-slate-900tracking-tight">Top Toy Categories</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <Link key={cat.name} href="#" className="group relative aspect-video rounded-[3rem] overflow-hidden">
                            <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            <span className="absolute bottom-10 left-10 text-xl font-black text-white font-heading uppercase tracking-widest">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Product Section ---
export function KeedosProductSection({ title, products = [] }: { title: string, products: any[] }) {
    return (
        <section className="py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-between mb-16">
                    <h2 className="text-4xl md:text-5xl font-black font-heading text-slate-900 tracking-tight">{title}</h2>
                    <Link href="/toys" className="hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#5B5FEF] hover:gap-3 transition-all font-heading">
                        View More
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {products.map((toy) => (
                        <ToyCard key={toy.id} toy={toy} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Promo Banner ---
export function KeedosPromoBanner() {
    return (
        <section className="py-24 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="bg-[#FFF8F0] rounded-[4rem] overflow-hidden flex flex-col lg:flex-row items-center relative min-h-[500px] border border-orange-50">
                    <div className="p-12 md:p-20 flex-1 z-10 text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-slate-900 mb-8 leading-tight tracking-tight">
                            The play room<br />needs an overhaul!
                        </h2>
                        <p className="text-slate-500 font-bold mb-10 max-w-md mx-auto lg:mx-0 font-body leading-relaxed">
                            Discover high-quality, sustainable toys that inspire imagination and creativity in every child.
                        </p>
                        <Link href="/toys" className="inline-flex items-center gap-2 bg-[#0F172A] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#5B5FEF] transition-all group active:scale-95 shadow-xl shadow-slate-200">
                            Shop Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="flex-1 w-full h-[400px] lg:h-full relative overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1566433316213-3be05ceb6261?auto=format&fit=crop&q=80&w=1200"
                            alt="Family playing"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Footer ---
export function KeedosFooter() {
    return (
        <footer className="bg-white pt-24 pb-8 px-4 border-t border-slate-50">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-[#5B5FEF] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                                <Package className="w-5 h-5" />
                            </div>
                            <span className="text-2xl font-black font-heading text-slate-900 tracking-tighter">ToyStore</span>
                        </Link>
                        <p className="text-slate-500 font-bold text-xs leading-relaxed mb-10 font-body">
                            The smartest, most sustainable way to play. Join 2,000+ happy parents today.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#5B5FEF] hover:text-white transition-all">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <FooterCol title="About" links={["Our story", "Sustainability", "Terms of Service", "Privacy Policy"]} />
                    <FooterCol title="Support" links={["Customer Service", "Shipping & Returns", "Contact Us", "FAQ"]} />
                    <FooterCol title="Newsletter" isForm />
                </div>

                <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 font-body">
                        © 2024 ToyStore. All rights reserved.
                    </p>
                    <div className="flex gap-4 grayscale opacity-30">
                        <div className="w-10 h-6 bg-slate-100 rounded" />
                        <div className="w-10 h-6 bg-slate-100 rounded" />
                        <div className="w-10 h-6 bg-slate-100 rounded" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterCol({ title, links, isForm }: { title: string, links?: string[], isForm?: boolean }) {
    return (
        <div>
            <h3 className="font-black font-heading text-sm text-slate-900 uppercase tracking-widest mb-8">{title}</h3>
            {isForm ? (
                <div className="space-y-4">
                    <p className="text-[11px] font-bold text-slate-500 font-body leading-relaxed">Join our weekly play tips.</p>
                    <div className="relative group">
                        <input className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-xs font-bold text-slate-900 focus:ring-4 focus:ring-indigo-50 transition-all font-body" placeholder="Email address" />
                        <button className="absolute right-2 top-2 bottom-2 bg-[#5B5FEF] text-white px-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100">Go</button>
                    </div>
                </div>
            ) : (
                <ul className="space-y-4">
                    {links?.map((link) => (
                        <li key={link}>
                            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-[#5B5FEF] transition-colors font-body">
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
