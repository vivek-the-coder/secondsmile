import Image from "next/image";

export function WhimsyNewsletter() {
    return (
        <section className="relative py-48 bg-[#F7EEDF] overflow-hidden">
            {/* Scalloped waves transition */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-[#121212] mask-scallop-top z-30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#121212] mask-scallop-bottom z-30 transform rotate-180"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    {/* Rotated Visual Visual Block with Depth */}
                    <div
                        className="flex-1 relative w-full aspect-[4/3] rounded-[48px] overflow-hidden border-[12px] border-white/20 rotate-[-4deg] flex items-center justify-center group"
                        style={{
                            background: "radial-gradient(circle at 40% 40%, #FFD76A 0%, #F4B400 60%)",
                            boxShadow: "0 10px 0 #C98F00, 0 25px 40px rgba(0,0,0,0.25)"
                        }}
                    >
                        <Image
                            src="/images/Gemini_Generated_Image_d16d1yd16d1yd16d.png"
                            alt="Sign Up Surprise"
                            fill
                            className="object-cover"
                        />
                        {/* Inner panel lighting */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                    </div>

                    <div className="flex-1 text-left p-[60px] rounded-[24px]" style={{
                        background: "#FFF6E6",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                    }}>
                        <h2 className="text-4xl md:text-5xl font-extrabold font-luckiest uppercase tracking-[0.5px] mb-4 leading-tight text-layered" style={{ color: "#d75151ff" }}>
                            Join the <span style={{ color: "#F4B400" }}>Community</span>
                        </h2>

                        <p className="text-[#5A5A5A] font-medium text-[16px] leading-relaxed mb-10 max-w-[420px]">
                            Get updates on new toy listings, safety tips, and smart ways to save on playtime.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 items-stretch">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="flex-1 bg-white px-6 py-[18px] text-[16px] font-medium text-[#1A1A1A] focus:outline-none focus:border-[#F4B400] transition-colors shadow-none placeholder:tracking-[1px] placeholder:text-[#A0A0A0]"
                                style={{
                                    border: "2px solid #E8E4DA",
                                    borderRadius: "40px"
                                }}
                            />
                            <button
                                className="px-9 py-4 font-bold text-base uppercase tracking-[1px] transition-all duration-300 transform hover:-translate-y-[2px]"
                                style={{
                                    background: "#F4B400",
                                    color: "#1A1A1A",
                                    borderRadius: "40px",
                                    boxShadow: "0 8px 18px rgba(0,0,0,0.15)"
                                }}
                            >
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
