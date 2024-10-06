import { db } from "@/firebase/clientApp"
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore"
import { WhereFilterOp } from "firebase/firestore";

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
export async function getFilteredItems(
    collectionName: string,
    field: string,
    operator: WhereFilterOp,
    value: any,
    converter: any
  ): Promise<DocumentData[]> {
    try {
      // Reference to the collection
      const collectionRef = collection(db, collectionName).withConverter(converter);
      
      // Create the query
      const q = query(collectionRef, where(field, operator, value));
  
      // Execute the query and fetch documents
      const querySnapshot = await getDocs(q);
      
      // Map over the documents and return data with document IDs
      const filteredItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return filteredItems;
    } catch (error) {
      console.error("Error fetching filtered items:", error);
      throw new Error(`Failed to fetch filtered items from ${collectionName}`);
    }
  }