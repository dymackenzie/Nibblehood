export default class Item {
    name: string;
    description: string;
    image: string;
    time: Date;
    claimed: Boolean;
    points: number;
    account: string;
    neighborhood: string

    constructor(name: string, description: string, image: string,
        time: Date, claimed: Boolean, points: number, account: string, neighborhood: string) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.time = time;
        this.claimed = claimed;
        this.points = points;
        this.account = account;
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
            neighborhood: item.neighborhood
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Item(data.name, data.description, data.image,
            data.time.toDate(), data.claimed, data.points, data.account, data.neighborhood
        );
    }
};