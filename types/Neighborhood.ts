export default class Neighborhood {
    name: string;
    location: {latitude: number, longitude: number};
    points: number;

    constructor(name: string, location: {latitude: number, longitude: number}, points: number) {
        this.name = name;
        this.location = location;
        this.points = points;
    }
}

// convert the data
export const neighborhoodConverter = {
    toFirestore: (neighborhood: any) => {
        return {
            name: neighborhood.name,
            location: neighborhood.location,
            points: neighborhood.points
            };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return new Neighborhood(data.name, data.location, data.points);
    }
};