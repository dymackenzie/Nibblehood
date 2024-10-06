import { getFirestore, collection, query, orderBy, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore'; 
import { db } from '@/firebase/clientApp';

/**
 * Fetches documents from a Firestore collection ordered by a specific field.
 * 
 * @param collectionName - The name of the Firestore collection
 * @param field - The field to order by
 * @param direction - The sort direction, 'asc' for ascending or 'desc' for descending
 * @returns A promise that resolves to an array of ordered documents
 */
export async function getOrderedItems(
  collectionName: string,
  field: string,
  direction: 'asc' | 'desc' = 'asc'
): Promise<DocumentData[]> {
  try {
    // Reference to the collection
    const collectionRef = collection(db, collectionName);

    // Create the query with ordering
    const q = query(collectionRef, orderBy(field, direction));

    // Execute the query and fetch documents
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    // Map over the documents and return data with document IDs
    const orderedItems = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return orderedItems;
  } catch (error) {
    console.error("Error fetching ordered items:", error);
    throw new Error(`Failed to fetch ordered items from ${collectionName}`);
  }
}