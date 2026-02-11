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

const checkDb = () => {
    if (!db) throw new Error("Firebase DB not initialized");
    return db;
};

export const adminService = {
    // Vendor Approvals
    async getPendingStores(): Promise<Store[]> {
        const database = checkDb();
        const q = query(collection(database, "stores"), where("status", "==", "pending"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Store));
    },

    async approveStore(storeId: string, ownerId: string): Promise<void> {
        const database = checkDb();
        const storeRef = doc(database, "stores", storeId);
        const userRef = doc(database, "users", ownerId);

        await updateDoc(storeRef, { status: "approved" });
        await updateDoc(userRef, {
            role: "vendor",
            vendorStatus: "approved",
            storeId: storeId
        });
    },

    async rejectStore(storeId: string, ownerId: string): Promise<void> {
        const database = checkDb();
        const storeRef = doc(database, "stores", storeId);
        const userRef = doc(database, "users", ownerId);

        await updateDoc(storeRef, { status: "rejected" });
        await updateDoc(userRef, { vendorStatus: "rejected" });
    },

    // Listings Moderation
    async getAllListings(): Promise<Toy[]> {
        const database = checkDb();
        const q = query(collection(database, "toys"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Toy));
    },

    async deleteListing(toyId: string): Promise<void> {
        const database = checkDb();
        await deleteDoc(doc(database, "toys", toyId));
    },

    // Orders Monitoring
    async getAllOrders(): Promise<Order[]> {
        const database = checkDb();
        const q = query(collection(database, "orders"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    },

    // Platform Stats
    async getPlatformStats() {
        const database = checkDb();
        const [usersCount, vendorsCount, toysCount, ordersCount] = await Promise.all([
            getCountFromServer(collection(database, "users")),
            getCountFromServer(query(collection(database, "users"), where("role", "==", "vendor"))),
            getCountFromServer(collection(database, "toys")),
            getCountFromServer(collection(database, "orders")),
        ]);

        return {
            totalUsers: usersCount.data().count,
            totalVendors: vendorsCount.data().count,
            totalListings: toysCount.data().count,
            totalOrders: ordersCount.data().count,
        };
    }
};
