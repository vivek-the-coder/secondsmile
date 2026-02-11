"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhimsyWave } from "./wave";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function WhimsyHero() {
    const [showIntro, setShowIntro] = useState(true);
    const loopVideoRef = useRef<HTMLVideoElement>(null);

    // Ensure loop video starts playing seamlessly when intro ends
    useEffect(() => {
        if (!showIntro && loopVideoRef.current) {
            loopVideoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
    }, [showIntro]);

    return (
        <section
            className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-48 overflow-hidden noise-pattern"
            style={{
                // background: "radial-gradient(circle at 50% 40%, #FFD76A 0%, #F4B400 60%)"
            }}
        >
            {/* Video Background */}
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                {/* Intro Video - Plays once and hides */}
                <video
                    id="introVideo"
                    autoPlay
                    muted
                    playsInline
                    className={cn("w-full h-full object-cover transition-opacity duration-500", !showIntro ? "opacity-0 invisible" : "opacity-100 visible")}
                    onEnded={() => setShowIntro(false)}
                >
                    <source src="/images/A_soft_cinematic_1080p_202602110039.mp4" type="video/mp4" />
                </video>

                {/* Loop Video - Starts playing once intro ends */}
                <video
                    id="loopVideo"
                    ref={loopVideoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover absolute inset-0 -z-10"
                >
                    <source src="/images/Create_a_seamless_1080p_202602110102.mp4" type="video/mp4" />
                </video>

                {/* Overlays for Readability */}
                <div className="absolute inset-0 z-10" style={{
                    background: "radial-gradient(circle at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)"
                }} />
            </div>
            {/* Soft background blobs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px]" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-5xl mx-auto flex flex-col items-center transform -translate-y-10">
                    <h1
                        className="text-4xl md:text-[58px] font-black font-luckiest uppercase leading-[1.1] tracking-widest mb-6"
                        style={{
                            color: "#FFF8E6",
                            textShadow: "0 12px 30px rgba(0,0,0,0.45)",
                            letterSpacing: "1px"
                        }}
                    >
                        Where Little Dreams<br />Come to Life
                    </h1>

                    <p className="text-lg md:text-[18px] font-medium mb-10 text-center" style={{
                        color: "rgba(255, 245, 225, 0.92)",
                        letterSpacing: "0.3px",
                        maxWidth: "600px",
                        margin: "16px auto 28px"
                    }}>
                        Beautiful toys designed to inspire imagination and joyful moments.
                    </p>

                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-[#1a1a1a] px-10 py-4 font-semibold text-lg transition-all duration-300"
                        style={{
                            background: "linear-gradient(135deg, #ffcc33, #f2a900)",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                            borderRadius: "50px",
                            padding: "16px 42px"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.45)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
                        }}
                    >
                        Explore Collection
                    </Link>
                </div>
            </div>

            {/* Scalloped divider on bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#121212] mask-scallop-bottom z-10 transform rotate-180"></div>
        </section>
    );
}
