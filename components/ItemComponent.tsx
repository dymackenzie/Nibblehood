import ItemType from "@/types/Item"
import { Button, Flex, Text, Image, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Divider, Icon, CardBody, Card, HStack } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { FaBookmark, FaWalking } from "react-icons/fa"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { IoMdShare } from "react-icons/io"
import { auth } from "@/firebase/clientApp"
import { useEffect, useState } from "react"
import axios from "axios"
import { FaLocationDot } from "react-icons/fa6"
import { IoTimeSharp } from "react-icons/io5"
const Test = dynamic(() => import('./Test'), {
  ssr: false
})
//import Image from "next/image"

//temporary dummy data
const distance = 0.1

const ItemComponent = ({ item }: { item: ItemType }) => {
  const [uid, setUID] = useState("");

  async function handleClaim() {
    console.log("handling claim button");
    if (uid.length > 0) {
      let anyItem = item as any;
      await axios.post("http://localhost:3000/api/updatePoints", {
        itemId: anyItem.id,
        points: item.points,
        userId: uid
      });
      
    } else {
      console.log('user not authenticated');
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
          
    <Card flexDir={'column'} alignItems={'center'} w={'100%'} pt={3} cursor={'pointer'}>
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
                <Button size={'sm'} colorScheme="green" onClick={handleClaim}>Claim</Button>
            </Flex>
            </CardBody>
            
        </Card>

  )
}

export default ItemComponent