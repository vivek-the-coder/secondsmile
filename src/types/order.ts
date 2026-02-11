export type OrderStatus = "pending" | "accepted" | "rejected" | "in_progress" | "completed" | "cancelled";
export type OrderType = "buy" | "rent";

export interface Order {
    id: string;
    toyId: string;
    toyTitle: string;
    toyImage: string;
    buyerId: string;
    sellerId: string;
    type: OrderType;
    status: OrderStatus;
    priceBreakdown: {
        itemPrice: number;
        rentalDays?: number;
        deposit?: number;
        totalAmount: number;
    };
    rental?: {
        startDate: string;
        endDate: string;
    };
    createdAt: any;
    updatedAt: any;
}
