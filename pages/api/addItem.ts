import { db } from "@/firebase/clientApp";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import 'firebase/firestore';
import Item, { itemConverter } from "@/types/Item";
import type { NextApiRequest, NextApiResponse } from 'next'

export const DEFAULT_POINTS = 5;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("received addItem request");
    const data = req.body;
    console.log(data);
    const name = data.name;
    const description = data.description;
    const image = data.image;
    const claimed = data.claimed;
    const userId = data.uid;
    if (userId) {
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);

        let neighborhoodId;
        if (docSnap.exists()) {
            neighborhoodId = docSnap.get("neighborhood");
        } else {
            console.error("no such user!");
        }

        const toAdd = new Item(
            name,
            description,
            image,
            new Date(),
            claimed,
            DEFAULT_POINTS,
            userId,
            docSnap.get("name"),
            neighborhoodId)

        // Add a new document in collection "items"
        const docRef = collection(db, "items").withConverter(itemConverter);
        await addDoc(docRef, toAdd);
        res.status(200).end();
    } else {
        res.status(500).end();
    }

}

// export const doAddItem = async (name: string, description: string, image: string, claimed: boolean) => {
//     const userId = firebase.auth().currentUser?.uid;
//     if (!userId) {
//         res.status(500).end();
//     }
//     const userRef = doc(db, 'users', userId);
//     const docSnap = await getDoc(userRef);
//     let neighborhoodId;
//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//         neighborhoodId = docSnap.get("neighborhood");
//     } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such user!");
//     }
//     const toAdd = new Item(
//         name,
//         description,
//         image,
//         new Date(),
//         claimed,
//         DEFAULT_POINTS,
//         userId,
//         neighborhoodId)

//     // Add a new document in collection "items"
//     const docRef = doc(db, "items", name);
//     await setDoc(docRef, toAdd);
//     // Add timestamp value
//     await updateDoc(docRef, {
//         timestamp: serverTimestamp()
//     });
// }