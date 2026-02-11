"use client";

import Image from "next/image";

export function WhimsyStorySection() {
    return (
        <section className="py-24 bg-[#121212] overflow-hidden noise-pattern">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-left">
                        <h2 className="text-5xl md:text-[80px] font-black font-luckiest uppercase tracking-[0.5px] mb-8 leading-[0.85] text-layered-white" style={{ color: "#FFF3C4" }}>
                            Why We Created<br />SecondSmile
                        </h2>
                        <div className="space-y-6 max-w-lg">
                            <p className="text-[15px] font-normal font-body text-[#C2C2C2] uppercase tracking-widest leading-[1.7]">
                                We believe great toys shouldn’t be used only once. SecondSmile connects families so toys can be rented, shared, and loved again. It’s an affordable, sustainable way to keep playtime exciting while reducing waste.
                            </p>
                            <p className="text-[15px] font-normal font-body text-[#C2C2C2] uppercase tracking-widest leading-[1.7]">
                                Our community helps toys travel from one happy home to another — spreading more smiles from one family to another.
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 relative flex justify-center">
                        {/* Intentional Abstract Shape Composition */}
                        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
                            {/* Shape 1: Large soft circle */}
                            <div className="absolute w-[85%] h-[85%] bg-[#F4B400]/10 rounded-full blur-3xl animate-pulse" />

                            {/* Shape 2: Primary circle with image */}
                            <div
                                className="relative w-[70%] h-[70%] rounded-full shadow-[0_40px_100px_rgba(217,156,0,0.2)] flex items-center justify-center group overflow-hidden"
                                style={{
                                    background: "radial-gradient(circle at center, #E3A800 0%, #C78A00 100%)",
                                    opacity: 0.85
                                }}
                            >
                                {/* Story Image */}
                                <Image
                                    src="/images/Gemini_Generated_Image_uzlge3uzlge3uzlg.png"
                                    alt="SecondSmile Story"
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Shape 3: Secondary decorative ring */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 border-[8px] border-white/10 rounded-full backdrop-blur-[2px]" />
                            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#F4B400]/20 rounded-full blur-xl animate-bounce-slow" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
