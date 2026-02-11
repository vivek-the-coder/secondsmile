"use client";

import Link from "next/link";
import { WhimsyHero } from "@/components/whimsy/hero";
import { WhimsyCategoryGrid } from "@/components/whimsy/category-grid";
import { KeedosProductSection } from "@/components/keedos-home";
import { WhimsyProductCard } from "@/components/whimsy/product-card";
import { WhimsyFeaturesStrip } from "@/components/whimsy/features-strip";
import { WhimsyCreamSection } from "@/components/whimsy/cream-section";
import { WhimsyStorySection } from "@/components/whimsy/story-section";
import { WhimsyNewsletter } from "@/components/whimsy/newsletter";
import { WhimsyFooter } from "@/components/whimsy/footer";
import { WhimsyNavbar } from "@/components/whimsy/navbar";
import { KEEDOS_POPULAR_PRODUCTS, KEEDOS_DEALS_PRODUCTS } from "@/lib/keedos-data";

export default function HomePage() {
  return (
    <div className="bg-[#121212] min-h-screen">
      {/* Brand Navbar */}
      <WhimsyNavbar />

      {/* Hero: High-fidelity entry */}
      <WhimsyHero />

      {/* Product Discovery: Recently Listed Toys */}
      <section className="py-12 md:py-24 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold font-luckiest uppercase tracking-[1px]" style={{ color: "#FFE3A3" }}>Recently Listed Toys</h2>
            <p className="text-[#C2C2C2] mt-4 font-medium uppercase tracking-[2px] text-xs md:text-sm">Real items from families near you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {KEEDOS_POPULAR_PRODUCTS.slice(0, 6).map((toy, idx) => {
              const bgColors = ["#8FE3CF", "#FFB38A", "#8ECDF7", "#C7A6FF", "#FF7A7A", "#FFD465"];
              return <WhimsyProductCard key={toy.id} toy={toy} bgColor={bgColors[idx]} />;
            })}
          </div>
          <div className="mt-16 text-center">
            <Link href="/shop" className="bg-[#F4B400] text-[#121212] px-8 py-4 md:px-16 md:py-6 rounded-full font-bold text-xs uppercase tracking-[1px] hover:bg-[#FFD465] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] active:translate-y-1 inline-block">
              View All Toys
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Safety Strip */}
      <WhimsyFeaturesStrip />

      {/* Category Discovery */}
      <WhimsyCategoryGrid />

      {/* Break Section: For the Youngest (Cream theme) */}
      <WhimsyCreamSection />

      {/* Brand Story: Emotional Anchor */}
      <WhimsyStorySection />

      {/* Secondary Product Roll: Popular Picks */}
      <section className="py-12 md:py-24 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold font-luckiest uppercase tracking-[1px]" style={{ color: "#FFE3A3" }}>Most Loved by Families</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {KEEDOS_DEALS_PRODUCTS.slice(0, 4).map((toy, idx) => {
              const bgColors = ["#FFB38A", "#8FE3CF", "#FFD465", "#8ECDF7"];
              return <WhimsyProductCard key={toy.id} toy={toy} bgColor={bgColors[idx]} />;
            })}
          </div>
          <div className="mt-16 text-center">
            <Link href="/shop" className="bg-[#F4B400] text-[#121212] px-8 py-4 md:px-12 md:py-5 rounded-full font-bold text-xs uppercase tracking-[1px] hover:bg-[#FFD465] transition-all shadow-xl active:translate-y-1 inline-block">
              View All Toys
            </Link>
          </div>
        </div>
      </section>

      {/* Community / Newsletter */}
      <WhimsyNewsletter />

      {/* Giant Wordmark Footer */}
      <WhimsyFooter />
    </div>
  );
}
