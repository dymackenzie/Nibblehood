import { auth, db } from "@/firebase/clientApp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Account from "@/types/Account";
import Neighborhood from "@/types/Neighborhood";
import { neighborhoodConverter } from "@/types/Neighborhood";
import { accountConverter } from "@/types/Account";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";

// creates user with email and password
export const doCreateUserWithEmailAndPassword = async (email: string, password: string, 
    name: string, location: [number, number]) => {

    // create auth from email and password
    let create = await createUserWithEmailAndPassword(auth, email, password);

    // find neighborhood closest
    let neighborhood = await FindNeighborhood(location);

    // create user
    let user = new Account(create.user.uid, name, location, "");

    // push user to database
    const userCol = doc(db, "users", user.UUID).withConverter(accountConverter);
    await setDoc(userCol, user);
}

// algorithm to find closest neighborhood to user
const FindNeighborhood = async (location: [number, number]) => {
    // init variables
    let neighborhoodId = "";
    let neighborhoods:Neighborhood[] = [];
    // get collection
    const neighborhoodCol = collection(db, "neighborhoods").withConverter(neighborhoodConverter);
    // get data
    const snapshot = await getDocs(neighborhoodCol);
    // populate array
    snapshot.forEach((doc) => {
        neighborhoods.push({ ...doc.data(), id: doc.id })
    })

    const distanceSquared = (a: [number, number], b: [number, number]) => {
        return Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2);
    }

    // algorithm to find nearest neighborhood
    let closestIndex = 0;
    for (let i = 1; i < neighborhoods.length; i++) {
        if (distanceSquared(location, neighborhoods[i].location) < 
            distanceSquared(location, neighborhoods[closestIndex].location)) {
                closestIndex = i;
            }
    }

    return neighborhoods[closestIndex];
}

// signout
export const doSignOut = () => {
    return auth.signOut();
}