import { db } from "@/firebase/clientApp";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, FieldValue, deleteDoc } from "firebase/firestore";
import 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'

const DEFAULT_POINTS = 5;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let data = req.body;
    const userId = data.userId;
    const itemId = data.itemId;
    const itemRef = doc(db, 'items', itemId);
    const docSnap = await getDoc(itemRef);
    let submittedBy;
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        submittedBy = docSnap.get("submittedBy");
        if (submittedBy === userId) {
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

// // given a user ID and item ID, checks that the user created the item, and removes it from the database
// export const doRemoveItem = async (userId: string, itemId: string) => {
//     const itemRef = doc(db, 'items', itemId);
//     const docSnap = await getDoc(itemRef);
//     let submittedBy;
//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//         submittedBy = docSnap.get("submittedBy");
//         if (submittedBy === userId) {
//             await deleteDoc(itemRef);
//         } else {
//             console.log('item was submitted by different user')
//         }
//     } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such user!");
//     }
//     // const userID = firebase.auth().currentUser?.uid;

// }