/**
 * @file addItem.ts, a TypeScript file that defines an API route for adding an item to the database.
 * 
 * Adds an Item type to the database.
 */

import { db } from "@/firebase/clientApp";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import 'firebase/firestore';
import Item, { itemConverter } from "@/types/Item";
import type { NextApiRequest, NextApiResponse } from 'next'

export const DEFAULT_POINTS = 5;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("received addItem request");
    // get the data from the request
    const data = req.body;
    const name = data.name;
    const description = data.description;
    const image = data.image;
    const claimed = data.claimed;
    const userId = data.uid;
    // check if the user is authenticated
    if (userId) {
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);

        let neighborhoodId;
        // get the neighborhood of the user
        if (docSnap.exists()) {
            neighborhoodId = docSnap.get("neighborhood");
        } else {
            console.error("no such user!");
        }

        // create a new item object
        const toAdd = new Item(
            name,
            description,
            image,
            new Date(),
            claimed,
            DEFAULT_POINTS,
            userId,
            docSnap.get("name"),
            neighborhoodId
        );

        // add a new document in collection "items"
        const docRef = collection(db, "items").withConverter(itemConverter);
        await addDoc(docRef, toAdd);
        res.status(200).end();
    } else {
        res.status(500).end();
    }

}