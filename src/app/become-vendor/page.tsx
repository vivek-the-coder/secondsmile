"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { vendorService } from "@/lib/vendor-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Store, Loader2, CheckCircle2, ArrowLeft, Sparkles, Building2, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BecomeVendorPage() {
    const { user, profile, loading: authLoading } = useAuth();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        storeName: "",
        description: "",
        contactNumber: "",
        address: "",
    });

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
        if (profile?.vendorStatus === "pending") {
            setSubmitted(true);
        }
        if (profile?.role === "vendor") {
            router.push("/vendor/dashboard");
        }
    }, [user, profile, authLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSubmitting(true);
        try {
            await vendorService.registerVendor(user.uid, formData);
            setSubmitted(true);
        } catch (error) {
            console.error("Error registering vendor", error);
            alert("Failed to submit request.");
        } finally {
            setSubmitting(false);
        }
    };

    if (authLoading || !user) return null;

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20 flex items-center justify-center px-4">
                <Card className="w-full max-w-xl bg-white border-none shadow-2xl rounded-[3rem] p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                    <div className="mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 shadow-inner shadow-emerald-100">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-black font-heading text-slate-900 mb-4 tracking-tight">Application Received!</h1>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
                        Exciting! Your request to become a vendor is now being reviewed by our team.
                        We typically approve stores within <span className="text-indigo-600 font-bold">24-48 hours</span>.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Button size="lg" className="rounded-full font-black shadow-lg shadow-indigo-100" onClick={() => router.push("/")}>
                            Explore the Store
                        </Button>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-4">Safe & Secure Transactions</p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="text-center mb-16">
                    <div className="mx-auto w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-indigo-100">
                        <Store className="w-10 h-10 text-indigo-600" />
                    </div>
                    <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-indigo-600 text-xs font-black uppercase tracking-widest mb-6">
                        <Sparkles className="w-4 h-4" />
                        Partner Program
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-heading text-slate-900 mb-6">Open Your Store</h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                        Join our growing community of professional toy stores and collectors.
                        Start selling to thousands of parents and gift-seekers today.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card className="bg-white border-none shadow-sm rounded-[3rem] overflow-hidden">
                        <div className="p-8 md:p-16 space-y-10">
                            <div className="grid gap-8">
                                <FormItem label="Basic Info">
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                            <Input
                                                placeholder="Your Store Name"
                                                required
                                                className="rounded-2xl h-14 bg-slate-50 border-none pl-14 font-bold focus:ring-2 focus:ring-indigo-100"
                                                value={formData.storeName}
                                                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                            <Input
                                                placeholder="Business Phone Number"
                                                required
                                                className="rounded-2xl h-14 bg-slate-50 border-none pl-14 font-bold focus:ring-2 focus:ring-indigo-100"
                                                value={formData.contactNumber}
                                                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </FormItem>

                                <FormItem label="Location & Logistics">
                                    <div className="relative">
                                        <MapPin className="absolute left-5 top-[18px] w-5 h-5 text-slate-300" />
                                        <Textarea
                                            placeholder="Full Business Address"
                                            required
                                            className="rounded-[1.5rem] bg-slate-50 border-none min-h-[100px] pl-14 p-4 font-medium focus:ring-2 focus:ring-indigo-100"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </div>
                                </FormItem>

                                <FormItem label="Story & Specialties">
                                    <Textarea
                                        placeholder="What makes your toy store special? Tell us what you plan to sell."
                                        required
                                        className="rounded-[1.5rem] bg-slate-50 border-none min-h-[120px] p-6 font-medium focus:ring-2 focus:ring-indigo-100 leading-relaxed"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </FormItem>
                            </div>

                            <div className="pt-6">
                                <Button type="submit" disabled={submitting} size="lg" className="w-full h-16 text-lg font-black rounded-full shadow-xl shadow-indigo-100">
                                    {submitting ? (
                                        <>
                                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        "Launch My Store 🚀"
                                    )}
                                </Button>
                                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-8">
                                    Standard Verification Policy Applies
                                </p>
                            </div>
                        </div>
                    </Card>
                </form>
            </div>
        </div>
    );
}

function FormItem({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</Label>
            {children}
        </div>
    );
}
