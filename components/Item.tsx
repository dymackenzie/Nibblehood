import ItemType from "@/types/Item"
import { Button, Flex, Text, Image, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Divider, Icon, CardBody, Card, HStack } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { FaBookmark, FaWalking } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { IoMdShare } from "react-icons/io"
import { IoTimeSharp } from "react-icons/io5"
import { auth } from "@/firebase/clientApp"
import axios from "axios"
const Test = dynamic(() => import('./Test'), {
    ssr: false
});
//import Image from "next/image"

//temp dummy data
const distance = 0.1


const Item = ({item}: {item: ItemType}) => {

    async function handleClaim() {
      console.log("handling claim button");
      const user = auth.currentUser;
      if (user) {
        const res = await axios.post("/api/updatePoints", {
            itemId: item,
            points: item.points,
            userId: user.uid
          });
      } else {
        console.log('user not authenticated');
      }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <Card flexDir={'column'} alignItems={'center'} w={'100%'} pt={3} cursor={'pointer'} onClick={onOpen}>
            <CardBody>
            <Image borderRadius={'lg'} w={'100%'} h={'55%'} aspectRatio={1.3} objectFit={'cover'} src={item.image}/>        
            <Text fontSize={'h4'} fontWeight={'bold'} mt={'10px'}>{item.name}</Text>
            
            <HStack spacing={3} color={'gray1'} py={2}>                    
                <Flex alignItems={'center'}>
                    <FaLocationDot/>                        
                    <Text>{(distance * 12).toFixed()} min</Text>
                </Flex>     
                <Flex alignItems={'center'}>
                    <FaWalking/>                        
                    <Text>{(distance * 12).toFixed()} min</Text>
                </Flex>     
                <Flex alignItems={'center'}>
                    <IoTimeSharp/>                        
                    <Text>{(distance * 12).toFixed()} min</Text>
                </Flex>     
            </HStack>
            <Text my={'20px'} fontSize={'body'} color={'gray1'}>{item.description}</Text>
            <Flex w={'100%'} justifyContent={'right'}>
                <Button size={'sm'} colorScheme="green">Claim</Button>
            </Flex>
            </CardBody>
            
        </Card>

        <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
        
        <ModalOverlay />
        <ModalContent>
        <ModalCloseButton bgColor={'white'} color={'black'} />
          <ModalHeader>
            <Image borderRadius={'lg'} w={'100%'} h={'200px'} objectFit={'cover'} src={item.image}/> 
            <Flex justifyContent={'space-between'}>
                <Text>{item.name}</Text>
                <Flex justifyContent={'center'} alignItems={'center'}>
                    <Icon as={FaBookmark}/>
                    <Icon as={IoMdShare}/>
                    <Icon as={HiOutlineDotsHorizontal}/>
                </Flex>
            </Flex>
          </ModalHeader>
          
          
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
            
            <Button onClick={handleClaim} colorScheme={'green'}>Claim</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
        
    )    
}

export default Item