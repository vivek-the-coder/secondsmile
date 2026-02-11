"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

export function FiltersSidebar() {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
            <div>
                <h3 className="text-sm font-black font-heading text-slate-900 uppercase tracking-widest mb-6">Toy Type</h3>
                <div className="space-y-4">
                    {['New', 'Used', 'Rental'].map((type) => (
                        <div key={type} className="flex items-center group cursor-pointer">
                            <Checkbox id={`type-${type}`} className="rounded-lg border-slate-200 data-[state=checked]:bg-[#5B5FEF] data-[state=checked]:border-[#5B5FEF] w-5 h-5 shadow-sm" />
                            <Label htmlFor={`type-${type}`} className="ml-3 text-[10px] font-black text-slate-400 group-hover:text-[#5B5FEF] cursor-pointer transition-colors uppercase tracking-[0.15em] font-heading">
                                {type}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator className="bg-slate-50" />

            <div>
                <h3 className="text-xl font-bold font-heading text-slate-900 mb-6">Price Range</h3>
                <Slider defaultValue={[0, 10000]} max={50000} step={100} className="mb-6 opacity-80" />
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                    <span>₹0</span>
                    <span>₹50,000+</span>
                </div>
            </div>

            <Separator className="bg-slate-50" />

            <div>
                <h3 className="text-sm font-black font-heading text-slate-900 uppercase tracking-widest mb-6">Condition</h3>
                <div className="space-y-4">
                    {['New', 'Like New', 'Good', 'Acceptable'].map((cond) => (
                        <div key={cond} className="flex items-center group cursor-pointer">
                            <Checkbox id={`cond-${cond}`} className="rounded-lg border-slate-200 w-5 h-5 data-[state=checked]:bg-[#5B5FEF] data-[state=checked]:border-[#5B5FEF] shadow-sm" />
                            <Label htmlFor={`cond-${cond}`} className="ml-3 text-[10px] font-black text-slate-400 group-hover:text-[#5B5FEF] cursor-pointer transition-colors uppercase tracking-[0.15em] font-heading">
                                {cond}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator className="bg-slate-50" />

            <div>
                <h3 className="text-sm font-black font-heading text-slate-900 uppercase tracking-widest mb-6">Age Group</h3>
                <div className="grid grid-cols-2 gap-3">
                    {['0-3', '4-7', '8-12', '13+'].map((age) => (
                        <div key={age} className="relative">
                            <Checkbox id={`age-${age}`} className="peer hidden" />
                            <Label
                                htmlFor={`age-${age}`}
                                className="flex items-center justify-center p-3 rounded-2xl border border-slate-100 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest peer-data-[state=checked]:bg-[#5B5FEF] peer-data-[state=checked]:text-white peer-data-[state=checked]:border-transparent transition-all cursor-pointer hover:bg-slate-100 font-heading"
                            >
                                {age} yrs
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
