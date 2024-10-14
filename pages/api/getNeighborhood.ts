/**
 * @file getNeighborhood.ts, a TypeScript file that defines an API route that returns the neighborhood of the user.
 */

import { db } from "@/firebase/clientApp"
import { neighborhoodConverter } from "@/types/Neighborhood";
import { doc, getDoc } from "firebase/firestore"
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // check if user is logged in
    if (req.body.uid) {
        const userRef = doc(db, 'users', req.body.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            // get the neighborhood of the user
            const neighborhoodId = docSnap.get("neighborhood");
            const neighborhoodRef = doc(db, 'neighborhoods', neighborhoodId).withConverter(neighborhoodConverter);
            const docSnapNeighborhood = await getDoc(neighborhoodRef);
            if (docSnapNeighborhood.exists()) {
                // returns the neighborhood data
                res.json(docSnapNeighborhood.data())
            } else {
                console.log('neighborhood doesnt exist');
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