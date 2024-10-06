import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

const PostFood = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <Button bottom={0} pos={'relative'} onClick={onOpen}>Post Food</Button>
        
        <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent>          
          <ModalCloseButton />
          <ModalBody>
            <Flex>
                <Flex bgColor={'green'} w={'40%'}>hi</Flex>
                <Flex bgColor={'red'} w={'60%'}>hi</Flex>
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

export default PostFood