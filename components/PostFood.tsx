import { Text, Box, Button, Editable, EditableTextarea, Flex, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react";
// import { doAddItem } from "../api/addItem";
import firebase from "firebase/compat/app";
import axios from "axios";
import SignUp from "@/pages/signup";
import { getAuth } from "firebase/auth";
import ItemComponent from "./ItemComponent";
import Item from "@/types/Item";
import { DEFAULT_POINTS } from "@/pages/api/addItem";
import FileUploadButton from "./fileUploadButton";


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
      <Button bottom={0} pos={'relative'} onClick={onOpen} colorScheme='teal' size='lg'>Post Food</Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
            Add New Food Item
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection='column' alignItems='center'>
              <Box w="100%" p={5}>
                <form onSubmit={handleSubmit} id="addItemForm">
                  <Stack spacing={5}>
                    <Heading as="h3" size="md">Item Details</Heading>

                    <Input
                      type="text"
                      id="nameInput"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setItem(getItem()); }}
                      size='lg'
                      focusBorderColor='teal.500'
                    />

                    <Textarea
                      id="textInput"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => { setDescription(e.target.value); setItem(getItem()); }}
                      size='lg'
                      focusBorderColor='teal.500'
                    />

                    {/* <Input type="file" onChange={handleChange} p={2} style={}/> */}

                    {/* <FileUploadButton onChange={handleChange} /> */}
                    {/* {file && (
                      <Image
                        src={file}
                        boxSize='300px'
                        objectFit='cover'
                        borderRadius='md'
                        mt={4}
                        alt='Selected item image'
                      />
                    )} */}
                    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg" maxW="400px" mx="auto">
                      <FileUploadButton onChange={handleChange} />

                      {file && (
                        <Box mt={4} textAlign="center">
                          <Box
                            w="100%"
                            h="300px"
                            overflow="hidden"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            borderWidth="2px"
                            borderColor="teal.500"
                            borderRadius="md"
                          >
                            <Image
                              src={file}
                              alt="Uploaded Image"
                              objectFit="cover"
                              width="100%"
                              height="100%"
                            />
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Stack>
                </form>
              </Box>
              {/* <Box mt={8} w="100%">
                <ItemComponent item={item} />
              </Box> */}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme='teal' size="md" onClick={handleSubmit}>
              Post!
            </Button>
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