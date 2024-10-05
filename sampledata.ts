import Account from "./types/Account"
import Item from "./types/Item"

const account1: Account = {
    name: "",
    email: "",
    password: "",
    location: ""
}

const account2: Account = {
    name: "",
    email: "",
    password: "",
    location: ""
}

const account3: Account = {
    name: "",
    email: "",
    password: "",
    location: ""
}

const item1: Item = {
    name: "",
    description: "",
    image: "",
    time: new Date(),
    claimed: false,
    points: 100,
    account: account1
}

const item2: Item = {
    name: "",
    description: "",
    image: "",
    time: new Date(),
    claimed: false,
    points: 100,
    account: account2
}

const item3: Item = {
    name: "",
    description: "",
    image: "",
    time: new Date(),
    claimed: false,
    points: 100,
    account: account3
}

export {account1, account2, account3, item1, item2, item3}