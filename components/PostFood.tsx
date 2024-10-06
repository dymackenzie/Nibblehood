import { Button, Editable, EditableTextarea, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react";
import axios from "axios";
import SignUp from "@/pages/signup";
import { auth } from "@/firebase/clientApp";
import { useEffect } from "react";

const PostFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [item, setItem] = useState('');
  const [uid, setUID] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      console.log(files);
      setFile(URL.createObjectURL(files[0]));
    }
  }

  async function handleSubmit() {
    console.log('sending ');
    if (uid.length > 0) {
      console.log('sending addItem request');
      axios.post("http://localhost:3000/api/addItem",{
          name: name,
          description: description,
          image: file,
          claimed: false,
          uid: uid
        });
        onClose();
    } else {
      console.log('user not authenticated, redirecting to log in (sign up)');
      return (<SignUp />);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
        setUID(user.uid)
        } else {
        console.log("logged out!")
        }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Button bottom={0} pos={'relative'} onClick={onOpen}>Post Food</Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection='row'>
              <Flex>
                {/* <Flex bgColor={'green'} w={'40%'}>hi</Flex>
              <Flex bgColor={'red'} w={'60%'}>hi</Flex> */}
                {/* <div className="App"> */}
                <form onSubmit={handleSubmit} id="addItemForm">
                  <h2>Add Item:</h2>
                  <Input type="text"
                    id="nameInput"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required />
                  <Textarea
                    id="textInput"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // style={styles.description}
                    required />

                  <Input type="file" onChange={handleChange} />
                  <Image src={file} style={styles.image} objectFit='cover' boxSize='400px' />
                  {/* <Button type="submit" colorScheme="blue" >Post!</Button> */}
                </form>
                {/* </div> */}
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