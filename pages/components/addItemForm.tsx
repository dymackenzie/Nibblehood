import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { doAddItem } from "../api/addItem";
import firebase from "firebase/compat/app";

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
    function handleSubmit() {
        const userID = firebase.auth().currentUser?.uid;
        if (userID) {
            doAddItem(name, description, file, false, userID)
        } else {//redirect to login
            console.log('not logged in');
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <h2>Add Item:</h2>
                <input type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required />
                <input type="text"
                    placeholder="Description"
                    value={name}
                    onChange={(e) => setDescription(e.target.value)}
                    style={styles.input}
                    required />
                <input type="file" onChange={handleChange} />
                <img src={file} />
                <Button type="submit" />
            </form>
        </div>
    );
}
const styles = {
    input: {

    }
}

export default AddItemForm