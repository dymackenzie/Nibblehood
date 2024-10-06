import { db } from "@/firebase/clientApp"
import { collection, query, where, getDocs } from "firebase/firestore"
import Account from "@/types/Account";
import Item, { itemConverter } from "@/types/Item";

export const getItemsNeighbourhood = async (user: Account) => {
    var filteredItems:Item[] = [];

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

export const getItemsUser = async (user: Account) => {
    var filteredItems:Item[] = [];

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