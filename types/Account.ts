/**
 * Account.ts, a TypeScript file that defines the Account class and its converter.
 * 
 * Structure:
 * - UUID: unique identifier for the account
 * - name: name of the account
 * - location: latitude and longitude of the account
 * - neighborhood: reference to the neighborhood id
 * - neighborhoodName: name of the neighborhood
 * - points: amount of points the account has
 */

export default class Account {
    UUID: string;
    name: string;
    location: {latitude: number, longitude: number};
    neighborhood: string;
    neighborhoodName: string;
    points: number;

    constructor(uuid: string, name: string, location: {latitude: number, longitude: number}, neighborhood: string, neighborhoodName: string, points: number) {
        this.UUID = uuid;
        this.name = name;
        this.location = location;
        this.neighborhood = neighborhood;
        this.neighborhoodName = neighborhoodName;
        this.points = points;
    }
}

// convert the data
export const accountConverter = {
    toFirestore: (account: any) => {
        return {
            UUID: account.UUID,
            location: account.location,
            name: account.name,
            neighborhood: account.neighborhood,
            neighborhoodName: account.neighborhoodName,
            points: account.points
            };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Account(data.UUID, data.name, 
            data.location, data.neighborhood, data.neighborhoodName, data.points);
    }
};