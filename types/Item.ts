/**
 * Item.ts, a TypeScript file that defines the Item class and its converter.
 * 
 * Structure:
 * - name: name of the item
 * - description: item description
 * - image: reference to the image url
 * - time: Date
 * - claimed: has user claimed the item
 * - points: amount of points this item is worth
 * - account: reference to the account poster id
 * - accountName: account poster name
 * - neighborhood: reference to the neighborhood id
 */

export default class Item {
    name: string;
    description: string;
    image: string;
    time: Date;
    claimed: Boolean;
    points: number;
    account: string;
    accountName: string;
    neighborhood: string;

    constructor(name: string, description: string, image: string,
        time: Date, claimed: Boolean, points: number, account: string, 
        accountName: string, neighborhood: string) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.time = time;
        this.claimed = claimed;
        this.points = points;
        this.account = account;
        this.accountName = accountName;
        this.neighborhood = neighborhood;
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
            account: item.account,
            accountName: item.accountName,
            neighborhood: item.neighborhood
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Item(data.name, data.description, data.image,
            data.time.toDate(), data.claimed, data.points, 
            data.account, data.accountName, data.neighborhood
        );
    }
};