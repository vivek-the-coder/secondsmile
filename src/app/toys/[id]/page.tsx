"use client";

import { use, useEffect, useState } from "react";
import { toyService } from "@/lib/toy-service";
import { orderService } from "@/lib/order-service";
import { useAuth } from "@/contexts/auth-context";
import { Toy } from "@/types/toy";
import { ImageGallery } from "@/components/image-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Star,
    ShieldCheck,
    Truck,
    RefreshCcw,
    Info,
    Loader2,
    Calendar as CalendarIcon,
    ArrowLeft,
    MessageSquare
} from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ToyDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user } = useAuth();
    const router = useRouter();

    const [toy, setToy] = useState<Toy | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Rental states
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalPrice, setTotalPrice] = useState<number | null>(null);

    useEffect(() => {
        async function fetchToy() {
            try {
                const data = await toyService.getToyById(id);
                setToy(data);
            } catch (error) {
                console.error("Error fetching toy:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchToy();
    }, [id]);

    useEffect(() => {
        if (startDate && endDate && toy?.rentalPricePerDay) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = end.getTime() - start.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            if (diffDays > 0) {
                const total = (toy.rentalPricePerDay * diffDays) + (toy.depositAmount || 0);
                setTotalPrice(total);
            } else {
                setTotalPrice(null);
            }
        }
    }, [startDate, endDate, toy]);

    const handleOrder = async (type: "buy" | "rent") => {
        if (!user) {
            router.push("/login");
            return;
        }
        if (!toy) return;

        setSubmitting(true);
        try {
            if (type === "rent") {
                if (!startDate || !endDate) {
                    alert("Please select rental dates");
                    setSubmitting(false);
                    return;
                }

                const isAvailable = await orderService.checkAvailability(toy.id, startDate, endDate);
                if (!isAvailable) {
                    alert("This toy is already booked for the selected dates.");
                    setSubmitting(false);
                    return;
                }
            }

            const orderData = {
                toyId: toy.id,
                toyTitle: toy.title,
                toyImage: toy.images[0],
                buyerId: user.uid,
                sellerId: toy.ownerId,
                type,
                status: "accepted" as const,
                priceBreakdown: {
                    itemPrice: type === "buy" ? toy.price : (toy.rentalPricePerDay || 0),
                    rentalDays: type === "rent" ? (totalPrice ? (totalPrice - (toy.depositAmount || 0)) / (toy.rentalPricePerDay || 1) : 0) : undefined,
                    deposit: type === "rent" ? toy.depositAmount : undefined,
                    totalAmount: type === "buy" ? toy.price : (totalPrice || 0),
                },
                rental: type === "rent" ? { startDate, endDate } : undefined,
            };

            await orderService.createOrder(orderData);
            router.push("/orders");
        } catch (error) {
            console.error("Error placing order", error);
            alert("Failed to place order.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <p className="text-muted-foreground font-medium">Fetching toy magic...</p>
            </div>
        );
    }

    if (!toy) notFound();

    const isRental = toy.type === "rental";

    return (
        <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Breadcrumbs/Back */}
                <Link href="/toys" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Collection
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Visuals */}
                    <div className="space-y-8">
                        <ImageGallery images={toy.images} />

                        <div className="hidden lg:grid grid-cols-3 gap-4">
                            <BenefitCard icon={Truck} title="Free Delivery" sub="Over ₹2000" />
                            <BenefitCard icon={ShieldCheck} title="Verified Quality" sub="Hand-checked" />
                            <BenefitCard icon={RefreshCcw} title="Easy Returns" sub="7 Days" />
                        </div>
                    </div>

                    {/* Right: Info & Actions */}
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <Badge className={cn(
                                "px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest border-none",
                                toy.type === "new" ? "bg-emerald-500 text-white" :
                                    toy.type === "rental" ? "bg-purple-500 text-white" : "bg-orange-500 text-white"
                            )}>
                                {toy.type === "new" ? "Store Product" : toy.type}
                            </Badge>
                            <Badge variant="outline" className="px-4 py-1.5 rounded-full text-[10px] uppercase font-bold text-slate-400 border-slate-100">
                                Condition: {toy.condition}
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black font-heading text-slate-900 mb-4 leading-tight">
                            {toy.title}
                        </h1>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1.5 font-bold text-yellow-700">{toy.rating}</span>
                            </div>
                            <span className="text-slate-400 font-bold text-sm">{toy.reviewsCount} reviews</span>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-[2rem] mb-10 border border-slate-100">
                            {isRental ? (
                                <div className="space-y-1">
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Rental Pricing</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-indigo-600">₹{toy.rentalPricePerDay}</span>
                                        <span className="text-slate-400 font-bold">/ day</span>
                                    </div>
                                    {toy.depositAmount && (
                                        <div className="mt-4 flex items-center gap-2 text-emerald-600">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                            <p className="text-sm font-bold italic">₹{toy.depositAmount} refundable deposit</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Full Purchase</p>
                                    <span className="text-5xl font-black text-indigo-600">₹{toy.price}</span>
                                </div>
                            )}
                        </div>

                        {/* Rental Dynamic Total */}
                        {isRental && totalPrice !== null && (
                            <div className="mb-10 p-6 bg-indigo-600 rounded-[2rem] text-white shadow-xl shadow-indigo-100 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-bold opacity-80">Estimated Total</span>
                                    <span className="text-3xl font-black text-white">₹{totalPrice}</span>
                                </div>
                                <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider text-right">Includes refundable deposit</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            {isRental ? (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Start Date</Label>
                                            <input
                                                type="date"
                                                className="w-full rounded-2xl bg-slate-50 border-none p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-100"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                min={new Date().toISOString().split("T")[0]}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] uppercase font-black tracking-widest text-slate-400">End Date</Label>
                                            <input
                                                type="date"
                                                className="w-full rounded-2xl bg-slate-50 border-none p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-100"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                min={startDate || new Date().toISOString().split("T")[0]}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        size="lg"
                                        className="w-full h-16 text-lg font-bold rounded-full shadow-lg shadow-indigo-100"
                                        onClick={() => handleOrder("rent")}
                                        disabled={submitting}
                                    >
                                        {submitting ? <Loader2 className="animate-spin" /> : "Request Rental"}
                                    </Button>
                                </>
                            ) : (
                                <div className="flex gap-4">
                                    <Button
                                        size="lg"
                                        className="flex-1 h-16 text-lg font-bold rounded-full shadow-lg shadow-indigo-100"
                                        onClick={() => handleOrder("buy")}
                                        disabled={submitting}
                                    >
                                        {submitting ? <Loader2 className="animate-spin" /> : "Buy Now"}
                                    </Button>
                                    <Button variant="outline" size="lg" className="h-16 w-16 p-0 rounded-full">
                                        <MessageSquare className="w-6 h-6" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Seller Trust */}
                        <div className="mt-12 pt-8 border-t flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-black">
                                    {toy.sellerType[0]}
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Seller Type</p>
                                    <p className="font-bold text-slate-900">{toy.sellerType}</p>
                                </div>
                            </div>
                            <ShieldCheck className="w-6 h-6 text-emerald-500" />
                        </div>
                    </div>
                </div>

                {/* Additional Sections */}
                <div className="mt-20 grid lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-black font-heading mb-8">About this toy</h2>
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                            <p className="text-slate-500 font-medium leading-relaxed text-lg mb-8">
                                {toy.description}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <DetailItem label="Age Suitability" value={`${toy.ageGroup} Years+`} />
                                <DetailItem label="Category" value={toy.category} />
                                <DetailItem label="Dimensions" value="Variable (Depends on set)" />
                                <DetailItem label="Safety" value="Non-toxic, Verified" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-black font-heading mb-8">Reviews</h2>
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 text-center">
                            <Star className="w-12 h-12 text-yellow-100 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold mb-6 italic">Be the first to share your thoughts!</p>
                            <Button variant="outline" className="rounded-full w-full font-bold">Write Review</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BenefitCard({ icon: Icon, title, sub }: { icon: any, title: string, sub: string }) {
    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
            <Icon className="w-6 h-6 text-indigo-600 mb-2" />
            <p className="text-xs font-bold text-slate-900 mb-0.5">{title}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{sub}</p>
        </div>
    );
}

function DetailItem({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">{label}</p>
            <p className="font-bold text-slate-700">{value}</p>
        </div>
    );
}
