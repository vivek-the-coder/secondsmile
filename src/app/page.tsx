"use client";

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
      {/* Whimsy Custom Navbar */}
      <WhimsyNavbar />

      {/* Hero: High-fidelity entry */}
      <WhimsyHero />

      {/* Product Discovery: Top Playtime Picks */}
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold font-luckiest uppercase tracking-[1px]" style={{ color: "#FFE3A3" }}>TOP PLAYTIME PICKS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {KEEDOS_POPULAR_PRODUCTS.slice(0, 6).map((toy, idx) => {
              const bgColors = ["#8FE3CF", "#FFB38A", "#8ECDF7", "#C7A6FF", "#FF7A7A", "#FFD465"];
              return <WhimsyProductCard key={toy.id} toy={toy} bgColor={bgColors[idx]} />;
            })}
          </div>
          <div className="mt-16 text-center">
            <button className="bg-[#F4B400] text-[#121212] px-16 py-6 rounded-full font-bold text-xs uppercase tracking-[1px] hover:bg-[#FFD465] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] active:translate-y-1">
              VIEW ALL TOYS
            </button>
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
      <section className="py-24 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold font-luckiest uppercase tracking-[1px]" style={{ color: "#FFE3A3" }}>OUR MOST POPULAR PICKS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {KEEDOS_DEALS_PRODUCTS.slice(0, 4).map((toy, idx) => {
              const bgColors = ["#FFB38A", "#8FE3CF", "#FFD465", "#8ECDF7"];
              return <WhimsyProductCard key={toy.id} toy={toy} bgColor={bgColors[idx]} />;
            })}
          </div>
          <div className="mt-16 text-center">
            <button className="bg-[#F4B400] text-[#121212] px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[1px] hover:bg-[#FFD465] transition-all shadow-xl active:translate-y-1">
              View All Toys
            </button>
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
