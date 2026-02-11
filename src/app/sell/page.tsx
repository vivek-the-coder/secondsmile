"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { toyService } from "@/lib/toy-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus, X, Loader2, Sparkles, Camera, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SellToyPage() {
    const { user, profile, loading: authLoading } = useAuth();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        ageGroup: "",
        condition: "Good",
        type: "sale" as "sale" | "rental" | "both",
        price: "",
        rentalPricePerDay: "",
        depositAmount: "",
    });

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length + images.length > 5) {
            alert("Maximum 5 images allowed");
            return;
        }

        setImages([...images, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews([...previews, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (images.length === 0) {
            alert("Please upload at least one image");
            return;
        }

        setSubmitting(true);
        try {
            const imageUrls = await toyService.uploadImages(user.uid, images);
            await toyService.createToy({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                ageGroup: formData.ageGroup,
                condition: formData.condition as any,
                type: formData.type as any,
                price: Number(formData.price) || 0,
                images: imageUrls,
                ownerId: user.uid,
                sellerType: "Individual",
                rating: 5,
                reviewsCount: 0,
                rentalPricePerDay: Number(formData.rentalPricePerDay) || undefined,
                depositAmount: Number(formData.depositAmount) || undefined,
            });

            router.push("/toys");
        } catch (error) {
            console.error("Error submitting listing", error);
            alert("Failed to submit listing.");
        } finally {
            setSubmitting(false);
        }
    };

    if (authLoading || !user) return null;

    return (
        <div className="min-h-screen bg-[#F9FAFB] pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full text-indigo-600 text-sm font-bold mb-4 animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        <span>Give Your Toys a New Home</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-heading text-slate-900 mb-4">Create Listing</h1>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
                        Fill in the details below. High-quality photos and clear descriptions help your toy find a new playmate faster.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Basic Info */}
                    <Card className="bg-white border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                        <div className="p-8 md:p-12 space-y-8">
                            <h2 className="text-2xl font-black font-heading text-slate-900">Basic Information</h2>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-[10px] uppercase font-black tracking-widest text-slate-400">Toy Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g. LEGO Star Wars Millennium Falcon"
                                        className="rounded-2xl bg-slate-50 border-none h-14 px-6 font-bold focus:ring-2 focus:ring-indigo-100"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-[10px] uppercase font-black tracking-widest text-slate-400">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe the condition, features, or missing parts..."
                                        className="min-h-[160px] rounded-[2rem] bg-slate-50 border-none p-6 font-medium focus:ring-2 focus:ring-indigo-100 leading-relaxed"
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-[10px] uppercase font-black tracking-widest text-slate-400">Category</Label>
                                        <Select onValueChange={(val) => setFormData({ ...formData, category: val })} required>
                                            <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold focus:ring-2 focus:ring-indigo-100">
                                                <SelectValue placeholder="What kind of toy?" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-2xl">
                                                <SelectItem value="Building Sets">Building Sets</SelectItem>
                                                <SelectItem value="Vehicles">Vehicles</SelectItem>
                                                <SelectItem value="Baby Toys">Baby Toys</SelectItem>
                                                <SelectItem value="Dolls & Plush">Dolls & Plush</SelectItem>
                                                <SelectItem value="Outdoor">Outdoor</SelectItem>
                                                <SelectItem value="Board Games">Board Games</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ageGroup" className="text-[10px] uppercase font-black tracking-widest text-slate-400">Age Group</Label>
                                        <Select onValueChange={(val) => setFormData({ ...formData, ageGroup: val })} required>
                                            <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold focus:ring-2 focus:ring-indigo-100">
                                                <SelectValue placeholder="Target age" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-2xl">
                                                <SelectItem value="0-3">0-3 Years</SelectItem>
                                                <SelectItem value="4-7">4-7 Years</SelectItem>
                                                <SelectItem value="8-12">8-12 Years</SelectItem>
                                                <SelectItem value="13+">13+ Years</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Item Condition</Label>
                                    <RadioGroup
                                        defaultValue="Good"
                                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                        onValueChange={(val) => setFormData({ ...formData, condition: val })}
                                    >
                                        {["New", "Like New", "Good", "Acceptable"].map((cond) => (
                                            <div key={cond} className="relative">
                                                <RadioGroupItem value={cond} id={`cond-${cond}`} className="peer sr-only" />
                                                <Label
                                                    htmlFor={`cond-${cond}`}
                                                    className="flex h-12 items-center justify-center rounded-2xl border border-slate-100 bg-white text-xs font-bold text-slate-500 peer-data-[state=checked]:bg-indigo-600 peer-data-[state=checked]:text-white peer-data-[state=checked]:border-transparent transition-all cursor-pointer hover:bg-slate-50"
                                                >
                                                    {cond}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Section 2: Pricing & Type */}
                    <Card className="bg-white border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                        <div className="p-8 md:p-12 space-y-8">
                            <h2 className="text-2xl font-black font-heading text-slate-900">Listing Options</h2>
                            <RadioGroup
                                defaultValue="sale"
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                onValueChange={(val) => setFormData({ ...formData, type: val as "sale" | "rental" | "both" })}
                            >
                                <TypeOption id="type-sale" value="sale" label="Sell It" sub="Set a one-time price" />
                                <TypeOption id="type-rental" value="rental" label="Rent It Out" sub="Earn recurring daily income" />
                            </RadioGroup>

                            <div className="grid md:grid-cols-2 gap-8 pt-4">
                                {formData.type !== "rental" ? (
                                    <div className="space-y-2">
                                        <Label htmlFor="price" className="text-[10px] uppercase font-black tracking-widest text-slate-400">Selling Price (₹)</Label>
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300">₹</span>
                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="e.g. 1200"
                                                className="rounded-2xl bg-slate-50 border-none h-14 pl-10 pr-6 font-black text-lg focus:ring-2 focus:ring-indigo-100"
                                                required
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="rentPrice" className="text-[10px] uppercase font-black tracking-widest text-slate-400">Daily Rent (₹)</Label>
                                            <div className="relative">
                                                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300">₹</span>
                                                <Input
                                                    id="rentPrice"
                                                    type="number"
                                                    placeholder="e.g. 50"
                                                    className="rounded-2xl bg-slate-50 border-none h-14 pl-10 pr-6 font-black text-lg focus:ring-2 focus:ring-indigo-100"
                                                    required
                                                    value={formData.rentalPricePerDay}
                                                    onChange={(e) => setFormData({ ...formData, rentalPricePerDay: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="deposit" className="text-[10px] uppercase font-black tracking-widest text-slate-400">Refundable Deposit (₹)</Label>
                                            <div className="relative">
                                                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300">₹</span>
                                                <Input
                                                    id="deposit"
                                                    type="number"
                                                    placeholder="e.g. 1500"
                                                    className="rounded-2xl bg-slate-50 border-none h-14 pl-10 pr-6 font-black text-lg focus:ring-2 focus:ring-indigo-100"
                                                    required={formData.type === "rental"}
                                                    value={formData.depositAmount}
                                                    onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-400 font-medium pl-2">Security deposit returned when toy is returned.</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Section 3: Photos */}
                    <Card className="bg-white border-none shadow-sm rounded-[2.5rem] overflow-hidden">
                        <div className="p-8 md:p-12 space-y-8">
                            <h2 className="text-2xl font-black font-heading text-slate-900">Media</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {previews.map((src, i) => (
                                    <div key={i} className="relative aspect-square rounded-[1.5rem] bg-slate-50 overflow-hidden group">
                                        <Image src={src} alt="Preview" fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute top-2 right-2 bg-slate-900/40 backdrop-blur-md text-white rounded-full p-2 border border-white/20 hover:bg-slate-900 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {previews.length < 5 && (
                                    <label className="aspect-square rounded-[1.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-indigo-100 transition-all group">
                                        <Camera className="w-8 h-8 text-slate-300 mb-2 group-hover:text-indigo-400 group-hover:scale-110 transition-all" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Add Photo</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} multiple />
                                    </label>
                                )}
                            </div>
                            <p className="text-xs text-slate-400 font-medium">Add up to 5 high-resolution photos. First photo will be the cover.</p>
                        </div>
                    </Card>

                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
                        <Button type="button" variant="ghost" className="rounded-full px-8 font-bold" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={submitting} size="lg" className="rounded-full px-12 font-black shadow-xl shadow-indigo-100 w-full sm:w-auto">
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Finalizing...
                                </>
                            ) : (
                                "Post Listing ✨"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function TypeOption({ id, value, label, sub, special = false }: { id: string, value: string, label: string, sub: string, special?: boolean }) {
    return (
        <div className="relative">
            <RadioGroupItem value={value} id={id} className="peer sr-only" />
            <Label
                htmlFor={id}
                className={cn(
                    "flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-slate-50 bg-white hover:bg-slate-50 transition-all cursor-pointer peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:shadow-xl peer-data-[state=checked]:shadow-indigo-50",
                    special && "peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:shadow-emerald-50"
                )}
            >
                <span className="text-xl font-black font-heading text-slate-900 mb-1">{label}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{sub}</span>
            </Label>
        </div>
    );
}
