import { auth } from "@/firebase/clientApp";

// signout
export const doSignOut = () => {
    return auth.signOut();
}