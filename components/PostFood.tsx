/**
 * @file PostFood.tsx is a TypeScript file that defines the PostFood functional component.
 * 
 * This component is used to display the form for posting a new food item.
 * The form includes fields for the item name, description, and image.
 * The user can upload an image from their device.
 * Once form is submitted, the item is added to the database.
 */

import { Box, Button, Flex, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import SignUp from "@/pages/signup";
import { getAuth } from "firebase/auth";
import Item from "@/types/Item";
import { DEFAULT_POINTS } from "@/pages/api/addItem";
import FileUploadButton from "./fileUploadButton";
import { useRouter } from "next/router";

const PostFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const displayName = getAuth().currentUser?.displayName;
  const [item, setItem] = useState(getItem());

  const toast = useToast()
  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  // create a new item object
  function getItem() {
    return new Item(name, description, file, new Date(), false, DEFAULT_POINTS, "", displayName ? displayName : "Username", "");
  }  

  // handle the form submission
  async function handleSubmit() {
    console.log('sending auth check');
    const auth = getAuth();
    const user = auth.currentUser;    

    if (user) {
      console.log('sending addItem request');
      // if user is authenticated, add the item to the database
      const res = await axios.post("/api/addItem",
        {
          name: name,
          description: description,
          image: file,
          claimed: false,
          uid: user.uid
        });
      onClose();
      // clear the form
      setFile("");
      // show a success toast
      toast({title: 'Success!', description: 'Item Uploaded', status: 'success'});
    router.reload()
    } else {
      //redirect to login
      console.log('user not authenticated, redirecting to log in (sign up)');
      return (<SignUp/>);
    }
  }



  return (
    <>
      <Button bottom={0} pos={'relative'} onClick={onOpen} colorScheme='teal' size='lg'>
        Post Food
      </Button>
      <Modal isOpen={isOpen} onClose={() => {onClose(); setFile('')}} size={'lg'}>
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

                    <Flex mt={'20px'} w={'100%'} justifyContent={'center'}>
                        <FileUploadButton updateFile={setFile} />
                    </Flex>

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
                    
                  </Stack>
                </form>
              </Box>
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

export default PostFood