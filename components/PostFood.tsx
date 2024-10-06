import { Button, Editable, EditableTextarea, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react";
// import { doAddItem } from "../api/addItem";
import firebase from "firebase/compat/app";
import axios from "axios";
import SignUp from "@/pages/signup";
import { getAuth } from "firebase/auth";
import ItemComponent from "./ItemComponent";
import Item from "@/types/Item";
import { DEFAULT_POINTS } from "@/pages/api/addItem";

const PostFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const displayName = getAuth().currentUser?.displayName;
  const [item, setItem] = useState(getItem());

  const { isOpen, onOpen, onClose } = useDisclosure()

  function getItem() {
    return new Item(name, description, file, new Date(), false, DEFAULT_POINTS, "", displayName ? displayName : "Username", "");
  }

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
      onClose();
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
            <Flex flexDirection='row'>
              <Flex flexGrow='2'>
                {/* <Flex bgColor={'green'} w={'40%'}>hi</Flex>
              <Flex bgColor={'red'} w={'60%'}>hi</Flex> */}
                {/* <div className="App"> */}
                <form onSubmit={handleSubmit} id="addItemForm">
                  <h2>Add Item:</h2>
                  <Input type="text"
                    id="nameInput"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setItem(getItem()); }}
                    style={styles.input}
                    required />
                  <Textarea
                    id="textInput"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value); setItem(getItem()); }}
                    // style={styles.description}
                    required />

                  <Input type="file" onChange={handleChange} />
                  <Image src={file} style={styles.image} objectFit='cover' boxSize='400px' />
                  {/* <Button type="submit" colorScheme="blue" >Post!</Button> */}
                </form>
                {/* </div> */}
              </Flex>
              <Flex flexGrow='1'>
                <ItemComponent item={item} />
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme='blue' mr={3} onClick={handleSubmit}>
              Post!
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const styles = {
  image: {

  },
  button: {

  },
  input: {

  }

}

export default PostFood