import {
    collection,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    doc,
    query,
    where,
    serverTimestamp,
    updateDoc
} from "firebase/firestore";
import { db } from "./firebase";
import { Toy } from "@/types/toy";

const STORES_COLLECTION = "stores";

export interface Store {
    id: string;
    ownerId: string;
    storeName: string;
    description: string;
    contactNumber: string;
    address: string;
    status: "pending" | "approved" | "rejected";
    createdAt: any;
}

const checkDb = () => {
    if (!db) throw new Error("Firebase DB not initialized");
    return db;
};

export const vendorService = {
    // Register a new vendor/store
    async registerVendor(userId: string, storeData: Omit<Store, "id" | "ownerId" | "status" | "createdAt">): Promise<string> {
        const database = checkDb();
        const storeRef = await addDoc(collection(database, STORES_COLLECTION), {
            ...storeData,
            ownerId: userId,
            status: "pending",
            createdAt: serverTimestamp(),
        });

        // Update user's vendor status
        await updateDoc(doc(database, "users", userId), {
            vendorStatus: "pending"
        });

        return storeRef.id;
    },

    // Get store by owner ID
    async getStoreByOwner(userId: string): Promise<Store | null> {
        const database = checkDb();
        const q = query(collection(database, STORES_COLLECTION), where("ownerId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() } as Store;
        }
        return null;
    },

    // Get store by Store ID
    async getStoreById(storeId: string): Promise<Store | null> {
        const database = checkDb();
        const docSnap = await getDoc(doc(database, STORES_COLLECTION, storeId));
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Store;
        }
        return null;
    },

    // Get all products for a store
    async getStoreProducts(ownerId: string): Promise<Toy[]> {
        const database = checkDb();
        const q = query(collection(database, "toys"), where("ownerId", "==", ownerId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Toy));
    }
};
