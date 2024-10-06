import { db } from "@/firebase/clientApp"
import { neighborhoodConverter } from "@/types/Neighborhood";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Fetches neighborhood.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.uid) {
        const userRef = doc(db, 'users', req.body.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const neighborhoodId = docSnap.get("neighborhood");
            const neighborhoodRef = doc(db, 'neighborhoods', neighborhoodId).withConverter(neighborhoodConverter);
            const docSnapNeighborhood = await getDoc(neighborhoodRef);
            if (docSnapNeighborhood.exists()) {
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