import { FieldValue, Timestamp } from "firebase/firestore";
import Account from "./Account";

export default class Item {
    name: string;
    description: string;
    image: string;
    time: Date;
    claimed: Boolean;
    points: number;
    account: Account;

    constructor(name: string, description: string, image: string, 
        time: Date, claimed: Boolean, points: number, account: Account) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.time = time;
        this.claimed = claimed;
        this.points = points;
        this.account = account;             
    }
}

// convert the data
export const itemConverter = {
    toFirestore: (item: any) => {
        return {
            name: item.name,
            description: item.description,
            image: item.image,
            time: item.time,
            claimed: item.claimed,
            points: item.points,
            account: item.account
            };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Item(data.name, data.description, data.image,
            data.time, data.claimed, data.points, data.account
        );
    }
};