import { db } from "@/firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";


export const doAddItem = async (name: string, description: string, userID: string, neighborhoodID: string) => {


    // Add a new document in collection "items"
    const docRef = await setDoc(doc(db, "items", name), {
        name: name,
        description: description,
        userID: userID,
        neighborhoodID: neighborhoodID
    });
    // Add timestamp value
    // const res = await docRef.update({
    //     timestamp: FieldValue.serverTimestamp()
    // });
}