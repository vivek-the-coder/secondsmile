"use client";

import Image from "next/image";

export function WhimsyStorySection() {
    return (
        <section className="py-12 md:py-24 bg-[#121212] overflow-hidden noise-pattern relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <div className="w-full lg:w-1/2 text-left relative z-10">
                        <h2 className="text-3xl md:text-5xl lg:text-[80px] font-black font-luckiest uppercase tracking-[0.5px] mb-6 lg:mb-8 leading-[0.9] text-layered-white" style={{ color: "#FFF3C4" }}>
                            Why We Created<br />SecondSmile
                        </h2>
                        <div className="space-y-4 lg:space-y-6 max-w-lg">
                            <p className="text-[14px] lg:text-[15px] font-normal font-body text-[#C2C2C2] uppercase tracking-widest leading-[1.7]">
                                We believe great toys shouldn’t be used only once. SecondSmile connects families so toys can be rented, shared, and loved again. It’s an affordable, sustainable way to keep playtime exciting while reducing waste.
                            </p>
                            <p className="text-[14px] lg:text-[15px] font-normal font-body text-[#C2C2C2] uppercase tracking-widest leading-[1.7]">
                                Our community helps toys travel from one happy home to another — spreading more smiles from one family to another.
                            </p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 relative flex justify-center">
                        {/* Intentional Abstract Shape Composition */}
                        <div className="relative w-full max-w-[320px] lg:max-w-lg aspect-square flex items-center justify-center">
                            {/* Shape 1: Large soft circle */}
                            <div className="absolute w-[85%] h-[85%] bg-[#F4B400]/10 rounded-full blur-3xl animate-pulse" />

                            {/* Shape 2: Primary circle with image */}
                            <div
                                className="relative w-[70%] h-[70%] rounded-full shadow-[0_20px_50px_rgba(217,156,0,0.2)] lg:shadow-[0_40px_100px_rgba(217,156,0,0.2)] flex items-center justify-center group overflow-hidden z-20"
                                style={{
                                    background: "radial-gradient(circle at center, #E3A800 0%, #C78A00 100%)",
                                }}
                            >
                                {/* Story Image */}
                                <Image
                                    src="/images/Gemini_Generated_Image_uzlge3uzlge3uzlg.png"
                                    alt="SecondSmile Story"
                                    fill
                                    priority
                                    unoptimized
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Shape 3: Secondary decorative ring */}
                            <div className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 w-24 h-24 lg:w-40 lg:h-40 border-[6px] lg:border-[8px] border-white/5 lg:border-white/10 rounded-full backdrop-blur-[2px]" />
                            <div className="absolute -bottom-4 -left-4 lg:-bottom-8 lg:-left-8 w-16 h-16 lg:w-24 lg:h-24 bg-[#F4B400]/20 rounded-full blur-xl animate-bounce-slow" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
