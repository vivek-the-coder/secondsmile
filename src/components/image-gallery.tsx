"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
    images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-xl border bg-white">
                <Image
                    src={mainImage}
                    alt="Product image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, i) => (
                    <button
                        key={i}
                        onClick={() => setMainImage(image)}
                        className={cn(
                            "relative aspect-square overflow-hidden rounded-lg border bg-white",
                            mainImage === image ? "ring-2 ring-primary" : "hover:opacity-80 transition-opacity"
                        )}
                    >
                        <Image
                            src={image}
                            alt={`Thumbnail ${i + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
