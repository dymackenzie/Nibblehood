import { db } from "@/firebase/clientApp"
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Fetches filtered documents from a Firestore collection.
 * 
 * @param collectionName - The name of the Firestore collection
 * @param field - The field to filter by
 * @param operator - Firestore query operator (e.g., "==", "<", ">", etc.)
 * @param value - The value to filter the field by
 * @param converter - A converter to convert the field into an object
 * @returns A promise that resolves to an array of filtered documents
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("received listFiltered request");
    const data = req.body;
    const collectionName = data.collectionName;
    const field = data.field;
    const operator = data.operator;
    const value = data.value;
    const field2 = data.field;
    const operator2 = data.operator;
    const value2 = data.value;
    if (req.body.uid) {
        const userRef = doc(db, 'users', req.body.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const valueSnap = docSnap.get(value);
            try {
                // Reference to the collection
                const collectionRef = collection(db, collectionName);

                // Create the query
                const q = query(collectionRef, where(field, operator, valueSnap), where(field2, operator2, value2));

                // Execute the query and fetch documents
                const querySnapshot = await getDocs(q);

                // Map over the documents and return data with document IDs
                const filteredItems = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                return res.json(filteredItems);
            } catch (error) {
                console.error("Error fetching filtered items:", error);
                // throw new Error(`Failed to fetch filtered items from ${collectionName}`);
                res.status(500).end();
            }
        } else {
            console.log('user doesnt exist');
            res.status(500).end();
        }
    } else {
        console.log('user not logged in');
        res.status(500).end();
    }
}