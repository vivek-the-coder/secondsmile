"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, RefreshCcw, Leaf, Heart, ChevronRight, Package, Box, ShoppingCart, Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Hero Section ---
export function BrandHero() {
    return (
        <section className="relative pt-16 pb-24 md:pt-36 md:pb-48 overflow-hidden">
            {/* Background Blob/Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-[#FDF2F8] to-[#FFFBEB] -z-10" />
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-[120px]" />

            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 mb-8 shadow-sm">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                        <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" width={24} height={24} />
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#5B5FEF]">
                                Loved by 2,000+ Parents
                            </p>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black font-heading text-[#0F172A] leading-[1.05] mb-8 tracking-tight">
                            Where <span className="text-[#5B5FEF]">Playtime</span> <br />
                            Comes to Life
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed font-body">
                            Buy new toys, rent favorites, and give old ones a second life.
                            Discover a smarter, more sustainable way to play together.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                            <Link href="/toys" className="w-full sm:w-auto px-10 py-5 bg-[#5B5FEF] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-100 hover:bg-[#4A4ED1] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                Shop Toys
                            </Link>
                            <Link href="/toys?type=rental" className="w-full sm:w-auto px-10 py-5 bg-white text-[#5B5FEF] border-2 border-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-[#5B5FEF] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
                                <RefreshCcw className="w-4 h-4" />
                                Rent Toys
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 relative w-full">
                        <div className="relative aspect-[4/5] md:aspect-square w-full">
                            {/* Layered Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#FDBA2D] rounded-full blur-2xl opacity-20 animate-pulse" />
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FB7185] rounded-full blur-2xl opacity-20 animate-pulse" />

                            {/* Main Lifestyle Image */}
                            <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white group">
                                <Image
                                    src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1200"
                                    alt="Kids playing together"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>

                            {/* Trust Card */}
                            <div className="absolute -bottom-8 right-10 p-5 bg-white rounded-3xl shadow-2xl border border-slate-50 max-w-[200px] animate-float">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-[#FDBA2D] fill-current" />)}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400">5.0</span>
                                </div>
                                <p className="text-xs font-bold text-slate-900 leading-tight">"Safe, quick, and my kids love it!"</p>
                                <p className="text-[9px] font-black text-[#5B5FEF] uppercase tracking-widest mt-2">— Sarah J.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Category Grid ---
const CATEGORIES = [
    { name: "Learning Toys", icon: "🧩", color: "bg-indigo-50 border-indigo-100 text-[#5B5FEF]" },
    { name: "Vehicles", icon: "🚗", color: "bg-yellow-50 border-yellow-100 text-[#FDBA2D]" },
    { name: "Plush Toys", icon: "🧸", color: "bg-pink-50 border-pink-100 text-[#FB7185]" },
    { name: "Building Sets", icon: "🧱", color: "bg-emerald-50 border-emerald-100 text-[#34D399]" },
    { name: "Games & Puzzles", icon: "🎲", color: "bg-orange-50 border-orange-100 text-orange-500" },
];

export function BrandCategoryGrid() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <p className="text-[#5B5FEF] font-black text-[10px] uppercase tracking-[0.3em] mb-4">Discover</p>
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-slate-900 tracking-tight">Shop by Category</h2>
                    </div>
                    <Link href="/toys" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#5B5FEF] transition-all group">
                        Browse All
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {CATEGORIES.map((cat) => (
                        <Link key={cat.name} href="#" className="flex flex-col items-center group">
                            <div className="w-full aspect-square bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center text-5xl mb-6 group-hover:shadow-2xl group-hover:shadow-indigo-50 group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity", cat.color.split(' ')[0])} />
                                <span className="relative z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110">{cat.icon}</span>
                            </div>
                            <span className="text-sm font-black text-slate-900 uppercase tracking-widest font-heading transition-colors group-hover:text-[#5B5FEF]">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Lifestyle Section ---
export function BrandLifestyle() {
    return (
        <section className="py-24 md:py-32 overflow-hidden bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex flex-col lg:flex-row items-center gap-24">
                    <div className="flex-1 relative order-2 lg:order-1 w-full">
                        <div className="relative aspect-video lg:aspect-square w-full rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white group">
                            <Image
                                src="https://images.unsplash.com/photo-1566433316213-3be05ceb6261?auto=format&fit=crop&q=80&w=1200"
                                alt="Parents playing with child"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                        {/* Decorative floating badge */}
                        <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#FDBA2D] rounded-full flex items-center justify-center text-white text-5xl shadow-2xl animate-bounce-slow border-8 border-white invisible md:flex">
                            ✨
                        </div>
                    </div>

                    <div className="flex-1 order-1 lg:order-2">
                        <p className="text-[#FB7185] font-black text-[10px] uppercase tracking-[0.3em] mb-6">Our Story</p>
                        <h2 className="text-4xl md:text-6xl font-black font-heading text-slate-900 mb-8 leading-[1.1] tracking-tight">
                            Toys That Make <br />
                            <span className="text-[#5B5FEF]">Memories</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-500 font-medium mb-12 leading-relaxed font-body">
                            Play is more than just fun. It's how we learn, how we bond, and how we grow.
                            Our curated collection is designed to spark creativity and create lasting moments
                            for the whole family.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                            <SmallPoint title="Carefully Curated" text="Only the best for your little ones." />
                            <SmallPoint title="Educational Focus" text="Toys that teach as much as they entertain." />
                            <SmallPoint title="Quality Guaranteed" text="Built to last through generations of play." />
                            <SmallPoint title="Eco-Conscious" text="Supporting a sustainable toy cycle." />
                        </div>
                        <Link href="/about" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#5B5FEF] hover:gap-4 transition-all">
                            Learn more about our mission
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SmallPoint({ title, text }: { title: string, text: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#5B5FEF] mt-0.5 shadow-sm">
                <CheckCircle className="w-4 h-4" />
            </div>
            <div>
                <p className="font-black text-slate-900 text-sm uppercase tracking-wider leading-none mb-1.5 font-heading">{title}</p>
                <p className="text-slate-500 text-[11px] font-bold leading-tight font-body">{text}</p>
            </div>
        </div>
    );
}

// --- Trust Strip ---
const TRUST_ITEMS = [
    { icon: ShieldCheck, title: "Safe & Verified", text: "Trusted sellers only" },
    { icon: RefreshCcw, title: "Easy Returns", text: "30-day play guarantee" },
    { icon: Box, title: "Affordable Rentals", text: "Rent for 70% less" },
    { icon: Leaf, title: "Eco-Friendly", text: "Reducing toy waste" },
];

export function BrandTrustStrip() {
    return (
        <section className="bg-[#0F172A] py-20 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
                    {TRUST_ITEMS.map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8 group-hover:bg-[#5B5FEF] group-hover:border-[#5B5FEF] group-hover:shadow-2xl group-hover:shadow-indigo-500/20 transition-all duration-500 group-hover:-translate-y-2">
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-white font-black text-[11px] uppercase tracking-[0.2em] mb-3 font-heading">{item.title}</h3>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Friendly Newsletter ---
export function BrandNewsletter() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Playful Decorations */}
            <div className="absolute top-10 left-[10%] text-6xl opacity-10 blur-sm pointer-events-none">🧸</div>
            <div className="absolute bottom-10 right-[15%] text-6xl opacity-10 blur-sm pointer-events-none rotate-12">🧱</div>

            <div className="container mx-auto max-w-4xl px-4 relative z-10">
                <div className="bg-[#5B5FEF] rounded-[3.5rem] p-10 md:p-20 text-center shadow-2xl relative overflow-hidden">
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

                    <div className="relative z-10">
                        <p className="text-white/80 font-black text-[10px] uppercase tracking-[0.3em] mb-6">Stay in the Loop</p>
                        <h2 className="text-4xl md:text-5xl font-black font-heading text-white mb-8 tracking-tight">
                            Join 5,000+ Happy Parents
                        </h2>
                        <p className="text-indigo-100 font-medium text-lg mb-12 max-w-xl mx-auto font-body leading-relaxed">
                            Get exclusive early access to new arrivals, rental deals, and sustainable play tips delivered weekly.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white/95 backdrop-blur-sm border-none rounded-2xl px-6 py-4 text-sm font-bold shadow-xl focus:ring-4 focus:ring-indigo-300 text-slate-900"
                                suppressHydrationWarning
                            />
                            <button className="bg-[#FDBA2D] text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-yellow-500 transition-all active:scale-95">
                                Join Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
