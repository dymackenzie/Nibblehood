import { db } from "@/firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";
import Item from "@/types/Item";


export const doAddItem = async (name: string, description: string, image: string, time: Date, claimed: Boolean, points: number, userRef: string, neighborhoodRef: string) => {
    const toAdd: Item = {
        name: name,
        description: description,
        image: image,
        time: time,
        claimed: claimed,
        points: points,
        addedBy: userRef,
        neighborhood: neighborhoodRef
    }

    // Add a new document in collection "items"
    const docRef = await setDoc(doc(db, "items", name), toAdd);
    // Add timestamp value
    // const res = await docRef.update({
    //     timestamp: FieldValue.serverTimestamp()
    // });
}