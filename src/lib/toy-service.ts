import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import { Toy } from "@/types/toy";

const TOYS_COLLECTION = "toys";

export const toyService = {
    // Upload images to Firebase Storage
    async uploadImages(userId: string, files: File[]): Promise<string[]> {
        const uploadPromises = files.map(async (file) => {
            const timestamp = Date.now();
            const storageRef = ref(storage, `toys/${userId}/${timestamp}-${file.name}`);
            await uploadBytes(storageRef, file);
            return getDownloadURL(storageRef);
        });

        return Promise.all(uploadPromises);
    },

    // Create a new toy listing
    async createToy(toyData: Omit<Toy, "id">): Promise<string> {
        const docRef = await addDoc(collection(db, TOYS_COLLECTION), {
            ...toyData,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    },

    // Fetch all toys
    async getAllToys(filters?: { type?: string }): Promise<Toy[]> {
        let q = query(collection(db, TOYS_COLLECTION), orderBy("createdAt", "desc"));

        if (filters?.type) {
            q = query(q, where("type", "==", filters.type));
        }

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        } as Toy));
    },

    // Fetch a single toy by ID
    async getToyById(id: string): Promise<Toy | null> {
        const docRef = doc(db, TOYS_COLLECTION, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            } as Toy;
        }

        return null;
    },
    // Fetch recent toys with limit
    async getRecentToys(limitCount: number): Promise<Toy[]> {
        const q = query(collection(db, TOYS_COLLECTION), orderBy("createdAt", "desc"), limit(limitCount));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        } as Toy));
    },
};
