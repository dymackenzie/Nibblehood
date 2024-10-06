export default class Account {
    UUID: string;
    name: string;
    location: string;
    neighbourhood: string;

    constructor(uuid: string, name: string, location: string, neighbourhood: string) {
        this.UUID = uuid;
        this.name = name;
        this.location = location;
        this.neighbourhood = neighbourhood;
    }
}