import { collection, query, orderBy, getDocs, QuerySnapshot, DocumentData, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/clientApp';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Fetches documents from a Firestore collection ordered by a specific field.
 * 
 * @param collectionName - The name of the Firestore collection
 * @param field - The field to order by
 * @param direction - The sort direction, 'asc' for ascending or 'desc' for descending
 * @returns A promise that resolves to an array of ordered documents
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("received listOrdered request");
  const data = req.body;
  const direction = data.direction;
  const field = data.field;
  const collectionName = data.collectionName;
  if (req.body.uid) {
    try {
      // Reference to the collection
      const collectionRef = collection(db, collectionName);

      // Create the query with ordering
      const q = query(collectionRef, orderBy(field, direction));

      // Execute the query and fetch documents
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

      // Map over the documents and return data with document IDs
      const orderedItems = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));

      // return items
      return res.json(orderedItems);

    } catch (error) {
      console.error("Error fetching ordered items:", error);
      res.status(500).end();
    }
  } else {
    console.log("Not logged in");
    res.status(500).end();
  }
}