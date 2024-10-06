import { FieldValue, Timestamp } from "firebase/firestore";
import Account from "./Account";

export default interface Item {
    name: string,
    description: string,
    image: string,
    time: FieldValue,
    claimed: Boolean,
    points: number,
    account: Account,
    neighborhood: string
}