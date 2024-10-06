import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
// import { doAddItem } from "../api/addItem";
import firebase from "firebase/compat/app";
import axios from "axios";
import SignUp from "./signup";
import { getAuth } from "firebase/auth";

const AddItemForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files) {
            console.log(files);
            setFile(URL.createObjectURL(files[0]));
        }
    }
    async function handleSubmit() {
        console.log('sending auth check');
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            // doAddItem(name, description, file, false, userID)
            console.log('sending addItem request');
            const res = await axios.post("http://localhost:3000/api/addItem",
                {
                    name: name,
                    description: description,
                    image: file,
                    claimed: false,

                });

        } else {//redirect to login
            console.log('user not authenticated, redirecting to log in (sign up)');
            return (<SignUp />);
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit} id="addItemForm">
                <h2>Add Item:</h2>
                <input type="text"
                    id="nameInput"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required />
                <input type="text"
                    id="textInput"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={styles.input}
                    required />
                <input type="file" onChange={handleChange} />
                <img src={file} />
                <Button type="submit" colorScheme="blue" >Submit</Button>
            </form>
        </div>
    );
}
const styles = {
    input: {

    },
    button: {

    }
}

export default AddItemForm