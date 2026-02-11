"use client";

import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
    { name: "Soft Toys", image: "/images/Gemini_Generated_Image_v9ev3lv9ev3lv9ev.png" },
    { name: "Building Toys", image: "/images/Gemini_Generated_Image_nzbty2nzbty2nzbt.png" },
    { name: "Outdoor Play", image: "/images/Gemini_Generated_Image_yafqycyafqycyafq.png" },
    { name: "Educational", image: "/images/Gemini_Generated_Image_d112oid112oid112.png" },
    { name: "Creative Play", image: "/images/Gemini_Generated_Image_fw1lbpfw1lbpfw1l.png" },
    { name: "Pretend Play", image: "/images/Gemini_Generated_Image_5zlusc5zlusc5zlu.png" },
];

export function WhimsyCategoryGrid() {
    return (
        <section className="py-12 md:py-24 bg-[#121212]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-luckiest uppercase tracking-[1px] text-layered-white" style={{ color: "#FFE3A3" }}>Browse by Toy Type</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 place-items-center">
                    {CATEGORIES.map((cat) => (
                        <Link key={cat.name} href="/toys" className="group flex flex-col items-center">
                            <div
                                className="w-[124px] h-[124px] rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 border border-white/5 overflow-hidden relative"
                                style={{
                                    background: "radial-gradient(circle at center, #1F1F1F 0%, #181818 70%)",
                                    boxShadow: "0 15px 35px rgba(0,0,0,0.4), 0 0 25px rgba(244,180,0,0.15)"
                                }}
                            >
                                {/* Category Image */}
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
                            <span className="mt-8 text-[13px] font-medium uppercase tracking-[0.5px] text-[#D6D6D6] group-hover:text-[#F4B400] transition-colors leading-none text-center">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/toys"
                        className="btn-toy-primary text-[#121212] px-12 py-4 font-bold text-xs uppercase tracking-[1px]"
                    >
                        View All Categories
                    </Link>
                </div>
            </div>
        </section>
    );
}
