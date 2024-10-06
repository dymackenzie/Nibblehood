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