"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


import { useState, useRef } from "react";

export function WhimsyHero() {
    const [showIntro, setShowIntro] = useState(true);
    const loopVideoRef = useRef<HTMLVideoElement>(null);

    const handleIntroEnd = () => {
        if (loopVideoRef.current) {
            loopVideoRef.current.play();
        }
        setShowIntro(false);
    };

    return (
        <div
            className="w-screen relative"
            style={{ marginLeft: "calc(50% - 50vw)" }}
        >
            <section
                className="relative z-10 h-screen min-h-[700px] flex items-center justify-center text-center noise-pattern"
            >
                {/* Video Background */}
                <div className="absolute inset-0 z-0 bg-black">
                    {/* Loop Video - Sits behind and waits */}
                    <video
                        ref={loopVideoRef}
                        id="loopVideo"
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    >
                        <source src="/images/Create_a_seamless_1080p_202602110102.mp4" type="video/mp4" />
                    </video>

                    {/* Intro Video - Plays once then fades out */}
                    <video
                        key="intro"
                        id="introVideo"
                        autoPlay
                        muted
                        playsInline
                        preload="metadata"
                        poster="/images/hero-poster.jpg"
                        className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700 ${showIntro ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                        onEnded={handleIntroEnd}
                    >
                        <source src="/images/intro-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
                        <source src="/images/intro-small.webm" type="video/webm" />
                        <source src="/images/intro-optimized-small.mp4" type="video/mp4" />
                    </video>

                    {/* Overlays for Readability */}
                    <div className="absolute inset-0 z-10 bg-black/35" />
                </div>
                {/* Soft background blobs */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px]" />

                <div className="container mx-auto px-6 relative z-30">
                    <div className="max-w-4xl mx-auto flex flex-col items-center">
                        <h1
                            className="font-black font-luckiest uppercase tracking-widest mb-[20px]"
                            style={{
                                fontSize: "clamp(36px, 5vw, 72px)",
                                lineHeight: "1.1",
                                color: "#FFF8E6",
                                textShadow: "0 4px 20px rgba(0,0,0,0.25)",
                                letterSpacing: "1px"
                            }}
                        >
                            Give Toys a<br />Second Smile
                        </h1>

                        <p className="font-medium mb-[30px] text-center" style={{
                            maxWidth: "640px",
                            margin: "0 auto 30px",
                            fontSize: "18px",
                            lineHeight: "1.6",
                            color: "rgba(255,255,255,0.9)",
                        }}>
                            Rent or buy preloved toys from families near you. Safe, affordable, and better for the planet.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center mt-[10px]">
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 text-[#1a1a1a] font-black text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
                                style={{
                                    background: "linear-gradient(135deg, #ffcc33, #f2a900)",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                                    borderRadius: "50px",
                                    padding: "18px 48px"
                                }}
                            >
                                Browse Toys <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/sell"
                                className="inline-flex items-center gap-2 text-white font-bold text-lg transition-all duration-300 border-2 border-white/30 hover:border-white/80 hover:bg-white/10 backdrop-blur-md"
                                style={{
                                    borderRadius: "50px",
                                    padding: "16px 42px",
                                    textShadow: "0 2px 10px rgba(0,0,0,0.2)"
                                }}
                            >
                                List a Toy
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
