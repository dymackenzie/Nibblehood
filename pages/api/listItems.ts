import { db } from "@/firebase/clientApp"
import { collection, query, where, getDocs } from "firebase/firestore"
import Account from "@/types/Account";
import Item, { itemConverter } from "@/types/Item";

export async function getItemsNeighbourhood(user: Account) {
    const filteredItems:Item[] = [];

    // get reference to items
    const itemsCol = collection(db, "items").withConverter(itemConverter);

    // query with filter
    const q = query(itemsCol, where("neighbourhood", "==", user.neighbourhood));

    // get data
    const querySnapshot = await getDocs(q);

    // populate array
    querySnapshot.forEach((doc) => {
        filteredItems.push({ ...doc.data(), id: doc.id })
    })

    return filteredItems;
}

export async function getItemsUser(user: Account) {
    const filteredItems:Item[] = [];

    // get reference to items
    const itemsCol = collection(db, "items").withConverter(itemConverter);

    // query with filter
    const q = query(itemsCol, where("submittedBy", "==", user.UUID));

    // get data
    const querySnapshot = await getDocs(q);

    // populate array
    querySnapshot.forEach((doc) => {
        filteredItems.push({ ...doc.data(), id: doc.id })
    })

    return filteredItems;
}