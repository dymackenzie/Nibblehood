import { db } from "@/firebase/clientApp";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, FieldValue, deleteDoc } from "firebase/firestore";
import 'firebase/firestore';

const DEFAULT_POINTS = 5;

interface myItem {
    name: string,
    description: string,
    image: string,
    time: FieldValue,
    claimed: boolean,
    points: number,
    addedBy: string,
    neighborhood: string
}

// given a user ID and item ID, checks that the user created the item, and removes it from the database
export const doRemoveItem = async (userId: string, itemId: string) => {
    const itemRef = doc(db, 'items', itemId);
    const docSnap = await getDoc(itemRef);
    let submittedBy;
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        submittedBy = docSnap.get("submittedBy");
        if (submittedBy === userId) {
            await deleteDoc(itemRef);
        } else {
            console.log('item was submitted by different user')
        }
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such user!");
    }
    // const userID = firebase.auth().currentUser?.uid;

}