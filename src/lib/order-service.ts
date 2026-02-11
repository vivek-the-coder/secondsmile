import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    serverTimestamp,
    Timestamp
} from "firebase/firestore";
import { db } from "./firebase";
import { Order } from "@/types/order";

const ORDERS_COLLECTION = "orders";

const checkDb = () => {
    if (!db) throw new Error("Firebase DB not initialized");
    return db;
};

export const orderService = {
    // Create a new order
    async createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<string> {
        const database = checkDb();
        const docRef = await addDoc(collection(database, ORDERS_COLLECTION), {
            ...orderData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    },

    // Fetch orders for a specific user (buyer)
    async getUserOrders(userId: string): Promise<Order[]> {
        const database = checkDb();
        const q = query(
            collection(database, ORDERS_COLLECTION),
            where("buyerId", "==", userId),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        } as Order));
    },

    // Fetch orders where this user is the seller
    async getVendorOrders(userId: string): Promise<Order[]> {
        const database = checkDb();
        const q = query(
            collection(database, ORDERS_COLLECTION),
            where("sellerId", "==", userId),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        } as Order));
    },

    // Prevent double booking for rentals
    async checkAvailability(toyId: string, startDate: string, endDate: string): Promise<boolean> {
        const database = checkDb();
        const q = query(
            collection(database, ORDERS_COLLECTION),
            where("toyId", "==", toyId),
            where("type", "==", "rent"),
            where("status", "not-in", ["cancelled", "rejected"])
        );

        const querySnapshot = await getDocs(q);
        const existingOrders = querySnapshot.docs.map(doc => doc.data() as Order);

        const newStart = new Date(startDate);
        const newEnd = new Date(endDate);

        for (const order of existingOrders) {
            if (!order.rental) continue;
            const orderStart = new Date(order.rental.startDate);
            const orderEnd = new Date(order.rental.endDate);

            // Overlap logic: (start1 <= end2) and (end1 >= start2)
            if (newStart <= orderEnd && newEnd >= orderStart) {
                return false; // Already booked
            }
        }

        return true; // Available
    }
};
