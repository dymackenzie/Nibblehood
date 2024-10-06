import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react";
// import { doAddItem } from "../api/addItem";
import firebase from "firebase/compat/app";
import axios from "axios";
import SignUp from "@/pages/signup";
import { getAuth } from "firebase/auth";

const PostFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure()

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
          uid: user.uid
        });

    } else {//redirect to login
      console.log('user not authenticated, redirecting to log in (sign up)');
      return (<SignUp />);
    }
  }



  return (
    <>
      <Button bottom={0} pos={'relative'} onClick={onOpen}>Post Food</Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              {/* <Flex bgColor={'green'} w={'40%'}>hi</Flex>
              <Flex bgColor={'red'} w={'60%'}>hi</Flex> */}
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
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const styles = {
  input: {

  },
  button: {

  }
}

export default PostFood