"use client";

import { ShieldCheck, RotateCcw, Truck, MessageCircle } from "lucide-react";

const FEATURES = [
    { title: "Trusted Community", desc: "Profiles, ratings, and verified users you can trust.", icon: ShieldCheck },
    { title: "More Play, Less Cost", desc: "Access more toys for less. Save money, play more.", icon: RotateCcw },
    { title: "Flexible Rentals", desc: "Short-term fun without the long-term clutter.", icon: Truck },
    { title: "Better for the Planet", desc: "Give toys a second life and reduce plastic waste.", icon: MessageCircle },
];

export function WhimsyFeaturesStrip() {
    return (
        <section className="py-12 md:py-24 bg-[#121212]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-[#1F1F1F] p-8 rounded-[24px] border border-white/5 flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-2"
                            style={{
                                boxShadow: "0 10px 25px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.03) inset"
                            }}
                        >
                            <div
                                className="w-20 h-20 rounded-full bg-[#121212] flex items-center justify-center mb-8 text-[#F4B400] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(244,180,0,0.2)]"
                                style={{ boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)" }}
                            >
                                <item.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-[14px] font-bold font-luckiest text-white uppercase tracking-[0.5px] mb-4 leading-tight">
                                {item.title}
                            </h3>
                            <p className="text-[14px] font-medium text-[#B8B8B8] uppercase tracking-[0.2em] leading-[1.6] font-body max-w-[200px]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
