export default class Account {
    UUID: string;
    name: string;
    location: [number, number];
    neighbourhood: string;

    constructor(uuid: string, name: string, location: [number, number], neighbourhood: string) {
        this.UUID = uuid;
        this.name = name;
        this.location = location;
        this.neighbourhood = neighbourhood;
    }
}

// convert the data
export const accountConverter = {
    toFirestore: (account: any) => {
        return {
            UUID: account.UUID,
            location: account.location,
            name: account.name,
            neighborhood: account.neighborhood
            };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Account(data.UUID, data.name, 
            data.location, data.neighborhood);
    }
};