"use client";

import Image from "next/image";
import { WhimsyWave } from "./wave";

import { FOR_YOUNGEST_PRODUCTS } from "@/lib/keedos-data";

export function WhimsyCreamSection() {
    return (
        <section className="relative py-24 md:py-48 bg-[#F7EEDF] overflow-hidden noise-pattern">
            {/* Waves */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-[#121212] mask-scallop-top z-30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#121212] mask-scallop-bottom z-30 transform rotate-180"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12 md:mb-20 animate-fade-in-up">
                    <h2 className="text-4xl md:text-6xl font-black font-luckiest uppercase tracking-wide mb-4"
                        style={{
                            color: "#F4B400",
                            filter: "drop-shadow(0 4px 0 rgba(0,0,0,0.1))"
                        }}>
                        Perfect for Little Ones
                    </h2>
                    <p className="text-[#8c7e6a] font-medium text-lg max-w-lg mx-auto">
                        Soft, safe, and parent-loved toys for early learning and play.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {FOR_YOUNGEST_PRODUCTS.map((toy) => (
                        <div
                            key={toy.id}
                            className="p-5 rounded-[32px] transition-all duration-500 hover:-translate-y-3 group cursor-pointer"
                            style={{
                                background: "linear-gradient(180deg, #FFFFFF 0%, #FFF8F0 100%)",
                                boxShadow: "0 10px 30px -10px rgba(244, 180, 0, 0.15), 0 4px 8px rgba(0,0,0,0.05)"
                            }}
                        >
                            <div className="relative w-full aspect-[4/5] bg-[#FFF8F0] rounded-[24px] mb-6 flex items-center justify-center overflow-hidden shadow-inner">
                                <Image
                                    src={toy.images[0]}
                                    alt={toy.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                {/* Overlay gradient for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="px-2 pb-2 text-center">
                                <h3 className="text-sm font-bold font-fredoka text-[#4A4A4A] uppercase tracking-widest mb-1 group-hover:text-[#F4B400] transition-colors">{toy.title}</h3>
                                <div className="w-8 h-1 bg-[#F4B400]/20 mx-auto rounded-full my-3 group-hover:w-16 transition-all duration-300" />
                                <p className="text-2xl font-black font-luckiest text-[#F4B400] tracking-wide">₹{toy.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
