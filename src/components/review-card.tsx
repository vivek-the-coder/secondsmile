import { Star } from "lucide-react";
import { Review } from "@/types/toy";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
    review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="border-b py-6 last:border-0">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h4 className="font-semibold">{review.userName}</h4>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                "w-4 h-4",
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                            )}
                        />
                    ))}
                </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
                {review.comment}
            </p>
        </div>
    );
}
