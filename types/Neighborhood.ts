export default class Neighborhood {
    name: string;
    location: [number, number];
    points: number;

    constructor(name: string, location: [number, number], points: number) {
        this.name = name;
        this.location = location;
        this.points = points;
    }
}