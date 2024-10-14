/**
 * @file getUser.ts, a TypeScript file that defines an API route for getting a user's data from the database.
 */

import { db } from "@/firebase/clientApp"
import { doc, getDoc } from "firebase/firestore"
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // if logged in
    if (req.body.uid) {
        const userRef = doc(db, 'users', req.body.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            // return the user data
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