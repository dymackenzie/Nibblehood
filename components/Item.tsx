import ItemType from "@/types/Item"
import { Button, Flex, Text, Image, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Divider, Icon, CardBody, Card } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { FaBookmark, FaWalking } from "react-icons/fa"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { IoMdShare } from "react-icons/io"
const Test = dynamic(() => import('./Test'), {
    ssr: false
  })
//import Image from "next/image"

//temp dummy data
const distance = 0.1


const Item = ({item}: {item: ItemType}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <Card flexDir={'column'} alignItems={'center'} w={'30%'} pt={3} pb={'30px'} cursor={'pointer'} onClick={onOpen}>
            <CardBody>
            <Image borderRadius={'lg'} w={'100%'} aspectRatio={1.3} objectFit={'cover'} src={item.image}/>        
            <Text fontSize={'2xl'} fontWeight={'bold'}>{item.name}</Text>
            <Text size={'sm'}>{item.description}</Text>
            <Flex  justifyContent={'space-around'} fontSize={'xl'} bottom={1} pos={'absolute'}>
                <Text mr={10}>{distance} km</Text>       
                <Flex alignItems={'center'}>
                    <FaWalking/>                        
                    <Text>{(distance * 12).toFixed()} min</Text>
                </Flex>     
            </Flex>
            </CardBody>
            
        </Card>      

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Image borderRadius={'lg'} w={'100%'} aspectRatio={1.3} objectFit={'cover'} src={item.image}/> 
            <Flex justifyContent={'space-between'}>
                <Text>{item.name}</Text>
                <Flex justifyContent={'center'} alignItems={'center'}>
                    <Icon as={FaBookmark}/>
                    <Icon as={IoMdShare}/>
                    <Icon as={HiOutlineDotsHorizontal}/>
                </Flex>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <Divider borderColor={'black'}/>
            <Flex justifyContent={'space-around'}>
                <Text>ACCOUNT</Text>
                <Text>Listed 10min ago</Text>
                <Text>Cooked 1hr ago</Text>
            </Flex>
            <Divider borderColor={'black'}/>
            <Text>Description</Text>
            <Text>aweoifjoiafjoafjoadavlkcdnvlangl;ajf;ajf;ejf;asifjaoe;jckvlk;ajl;</Text>
            
            <Text>Ingredients</Text>
            <Text>ejfije * eifjiejf * eifjeifj * fejifej * fejifje</Text>

            <Text>Location</Text>
            <Flex justifyContent={'center'} flexDir={'column'} alignItems={'center'}>
                <Test/>
                <Text>89 N Surrey, Delta</Text>
            </Flex>
            
          </ModalBody>

          <ModalFooter justifyContent={'center'}>
            
            <Button colorScheme={'green'}>Claim</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
        
    )    
}

export default Item