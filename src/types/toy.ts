export type ToyType = 'new' | 'used' | 'rental';
export type ToyCondition = 'New' | 'Like New' | 'Good' | 'Acceptable';

export interface Toy {
    id: string;
    title: string;
    description: string;
    price: number;
    type: ToyType;
    condition: ToyCondition;
    images: string[];
    ownerId: string;
    sellerType: 'Individual' | 'Store';
    ageGroup: string;
    category: string;
    rating: number;
    reviewsCount: number;
    rentalPricePerDay?: number;
    depositAmount?: number;
}

export interface Review {
    id: string;
    toyId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}
