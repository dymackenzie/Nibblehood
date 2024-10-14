/**
 * @file ItemComponent.tsx is a TypeScript file that defines the ItemComponent functional component.
 * 
 * This component is used to display the item information on the home page.
 * The item information includes the item name, image, description, location, distance, and time.
 */

import ItemType from "@/types/Item"
import { Button, Flex, Text, Image, CardBody, Card, HStack, useToast } from "@chakra-ui/react"
import { FaWalking } from "react-icons/fa"
import { auth } from "@/firebase/clientApp"
import { useEffect, useState } from "react"
import axios from "axios"
import { FaLocationDot } from "react-icons/fa6"
import { IoTimeSharp } from "react-icons/io5"

// temporary dummy data
const distance = 100;
const location = "My house";
const time = "12:00 PM";

const ItemComponent = ({ item }: { item: ItemType }) => {
  const [uid, setUID] = useState("");
  const toast = useToast()
  const [claimed, setClaimed] = useState(false)

  async function handleClaim() {
    console.log("handling claim button");
    if (uid.length > 0) {
      // if user is authenticated, update the points of the user
      const anyItem = item as any;
      const temp = await axios.post("/api/updatePoints", {
        itemId: anyItem.id,
        points: item.points,
        userId: uid
      });

      // if the item was successfully claimed, update the state
      if (temp) {
        toast({title: 'Success!', description: 'Claimed Item', status: 'success'})
        setClaimed(true)
      }
    } else {
      console.log('user not authenticated');
    }
  }

  // check if user is logged in
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
          
    <Card flexDir={'column'} alignItems={'center'} w={'100%'} pt={5}>
      <CardBody>
        <Image borderRadius={'md'} w={'100%'} h={'50%'} aspectRatio={1.5} objectFit={'cover'} src={item.image}/>        
        <Text fontSize={'h4'} fontWeight={'bold'} mt={'10px'}>
          {item.name}
        </Text>
        <HStack spacing={3} color={'gray1'} py={3}>                    
            <Flex alignItems={'center'}>
                <FaLocationDot/>                        
                <Text>{location}</Text>
            </Flex>     
            <Flex alignItems={'center'}>
                <FaWalking/>                        
                <Text>{(distance).toFixed()} m</Text>
            </Flex>     
            <Flex alignItems={'center'}>
                <IoTimeSharp/>                        
                <Text>{time}</Text>
            </Flex>     
        </HStack>
        <Text my={'20px'} fontSize={'body'} color={'gray'}>
          {item.description}
        </Text>
        <Flex w={'100%'} justifyContent={'right'}>
            <Button disabled={claimed} size={'sm'} colorScheme="green" onClick={handleClaim}>Claim</Button>
        </Flex>
      </CardBody>
    </Card>
  )
}

export default ItemComponent