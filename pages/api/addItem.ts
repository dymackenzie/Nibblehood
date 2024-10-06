import { db } from "@/firebase/clientApp";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import Item from "@/types/Item";
import 'firebase/firestore';

const DEFAULT_POINTS = 5;


export const doAddItem = async (name: string, description: string, image: string, claimed: boolean, userId: string) => {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    let neighborhoodId;
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        neighborhoodId = docSnap.get("neighborhood");
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such user!");
    }
    const toAdd: Item = {
        name: name,
        description: description,
        image: image,
        time: serverTimestamp(),
        claimed: claimed,
        points: DEFAULT_POINTS,
        account: {
            name: "absc",
            email: "askjch@lAHJKB",
            password: "pass123",
            location: "alksdjf"
        },
        // account: userRef,
        neighborhood: neighborhoodId
    }

    // Add a new document in collection "items"
    const docRef = doc(db, "items", name);
    await setDoc(docRef, toAdd);
    // Add timestamp value
    await updateDoc(docRef, {
        timestamp: serverTimestamp()
    });
}