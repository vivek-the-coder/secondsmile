"use client";

import Link from "next/link";

export function WhimsyFooter() {
    return (
        <footer className="bg-[#121212] pt-32 pb-12 overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Quick Links</h4>
                        <ul className="space-y-4">
                            {["Home", "Categories", "Best Sellers", "About Us", "Contact Us"].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-[11px] font-bold text-[#B8B8B8] uppercase tracking-widest hover:text-[#FFD45A] transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Policies</h4>
                        <ul className="space-y-4">
                            {["Shipping Policy", "Return Policy", "Privacy Policy", "Terms & Conditions"].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-[11px] font-bold text-[#B8B8B8] uppercase tracking-widest hover:text-[#FFD45A] transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Follow Us</h4>
                        <ul className="space-y-4">
                            {["Instagram", "Facebook", "Twitter"].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-[11px] font-bold text-[#B8B8B8] uppercase tracking-widest hover:text-[#FFD45A] transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="text-[11px] font-bold text-[#BDBDBD] uppercase tracking-widest">+91 9488424273</li>
                            <li className="text-[11px] font-bold text-[#BDBDBD] uppercase tracking-widest">+91 033 1357 4353</li>
                            <li className="text-[11px] font-bold text-[#BDBDBD] uppercase tracking-widest lowercase">support@whimsy.com</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Branding */}
                <div className="container mx-auto px-6 mt-32 pt-16 border-t border-white/5 text-center">
                    <h2 className="text-[100px] md:text-[170px] font-black font-luckiest uppercase leading-none tracking-tighter select-none pointer-events-none" style={{ color: "#3A2A00", opacity: 0.3, fontWeight: 900 }}>
                        Whimsy
                    </h2>
                    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-medium text-[#B5B5B5] uppercase tracking-widest">
                        <p>© 2026 WHIMSY. ALL RIGHTS RESERVED.</p>
                        <div className="flex items-center gap-8">
                            <Link href="#" className="hover:text-[#FFD45A] transition-colors">PRIVACY POLICY</Link>
                            <Link href="#" className="hover:text-[#FFD45A] transition-colors">TERMS OF SERVICE</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterCol({ title, links }: { title: string, links: string[] }) {
    return (
        <div className="flex flex-col gap-6">
            <h3 className="text-[13px] font-black font-heading text-white uppercase tracking-widest mb-2">{title}</h3>
            <ul className="flex flex-col gap-4">
                {links.map((link) => (
                    <li key={link}>
                        <Link href="#" className="text-[11px] font-medium text-[#B5B5B5] hover:text-[#FFD45A] transition-colors font-body">
                            {link}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
