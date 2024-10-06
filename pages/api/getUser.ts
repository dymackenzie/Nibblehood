import { db } from "@/firebase/clientApp"
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Fetches user.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("received listItems request");
    if (req.body.uid) {
        const userRef = doc(db, 'users', req.body.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            res.json(docSnap.data())       
        } else {
            console.log('user doesnt exist');
            res.status(500).end();
        }
    } else {
        console.log('user not logged in');
        res.status(500).end();
    }
}