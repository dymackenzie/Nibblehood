import Account from "./types/Account"
import Item from "./types/Item"

const account1: Account = {
    name: "john",
    email: "jhon@gmail.com",
    password: "123",
    location: "114134"
}

const account2: Account = {
    name: "shaniqua",
    email: "shaniqua@gmail.com",
    password: "1293",
    location: "13443"
}

const account3: Account = {
    name: "shauntel",
    email: "shauntel@gmail.com",
    password: "1343",
    location: "1344"
}

const item1: Item = {
    name: "cucumber salad",
    description: "yummy!",
    image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/05/cucumber-salad.jpg",
    time: new Date(),
    claimed: false,
    points: 100,
    account: account1
}

const item2: Item = {
    name: "smash borgir",
    description: "smashy!",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4rzRAe2MNelNPNUmdie1buahrDKimTerDyQ&s",
    time: new Date(),
    claimed: false,
    points: 1230,
    account: account2
}

const item3: Item = {
    name: "lasanga",
    description: "DID SOMEONE SAY LASSSAWNYA?",
    image: "https://thecozycook.com/wp-content/uploads/2022/04/Lasagna-Recipe-f.jpg",
    time: new Date(),
    claimed: false,
    points: 10230,
    account: account3
}

export {account1, account2, account3, item1, item2, item3}