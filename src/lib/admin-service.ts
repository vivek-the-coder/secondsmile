import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    updateDoc,
    deleteDoc,
    getCountFromServer,
    orderBy
} from "firebase/firestore";
import { db } from "./firebase";
import { Store } from "./vendor-service";
import { Toy } from "@/types/toy";
import { Order } from "@/types/order";

export const adminService = {
    // Vendor Approvals
    async getPendingStores(): Promise<Store[]> {
        const q = query(collection(db, "stores"), where("status", "==", "pending"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Store));
    },

    async approveStore(storeId: string, ownerId: string): Promise<void> {
        const storeRef = doc(db, "stores", storeId);
        const userRef = doc(db, "users", ownerId);

        await updateDoc(storeRef, { status: "approved" });
        await updateDoc(userRef, {
            role: "vendor",
            vendorStatus: "approved",
            storeId: storeId
        });
    },

    async rejectStore(storeId: string, ownerId: string): Promise<void> {
        const storeRef = doc(db, "stores", storeId);
        const userRef = doc(db, "users", ownerId);

        await updateDoc(storeRef, { status: "rejected" });
        await updateDoc(userRef, { vendorStatus: "rejected" });
    },

    // Listings Moderation
    async getAllListings(): Promise<Toy[]> {
        const q = query(collection(db, "toys"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Toy));
    },

    async deleteListing(toyId: string): Promise<void> {
        await deleteDoc(doc(db, "toys", toyId));
    },

    // Orders Monitoring
    async getAllOrders(): Promise<Order[]> {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    },

    // Platform Stats
    async getPlatformStats() {
        const [usersCount, vendorsCount, toysCount, ordersCount] = await Promise.all([
            getCountFromServer(collection(db, "users")),
            getCountFromServer(query(collection(db, "users"), where("role", "==", "vendor"))),
            getCountFromServer(collection(db, "toys")),
            getCountFromServer(collection(db, "orders")),
        ]);

        return {
            totalUsers: usersCount.data().count,
            totalVendors: vendorsCount.data().count,
            totalListings: toysCount.data().count,
            totalOrders: ordersCount.data().count,
        };
    }
};
