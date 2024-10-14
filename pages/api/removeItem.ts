/**
 * @file removeItem.ts, a TypeScript file that defines an API route that removes an item from the database.
 * 
 * @param userId the id of the user that is trying to remove the item
 * @param itemId the id of the item to remove
 */

import { db } from "@/firebase/clientApp";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let data = req.body;
    const userId = data.userId;
    const itemId = data.itemId;
    const itemRef = doc(db, 'items', itemId);
    const docSnap = await getDoc(itemRef);
    let submittedBy;
    // if item exists
    if (docSnap.exists()) {
        submittedBy = docSnap.get("account");
        // if user is the one who submitted the item
        if (submittedBy === userId) {
            // delete item
            await deleteDoc(itemRef);
            res.status(200).end();
        } else {
            console.log('item was submitted by different user');
            res.status(500).end();
        }
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such user!");
        res.status(500).end();
    }
}