import Sidenav from "@/components/Sidenav"
import User from "@/components/User"
import { Flex, Heading, HStack, Image, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { auth } from "@/firebase/clientApp"
import Neighborhood from "@/types/Neighborhood"
import Account from "@/types/Account"

const Leaderboard = () => {

    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
    const [topContributors, setTopContributors] = useState<Account[]>([]);
    const [uid, setUID] = useState("");

    useEffect(() => {
        if (uid.length > 0) {
          axios.post('/api/listOrdered', {
            uid: uid,
            collectionName: "neighborhoods",
            field: "points",
            direction: "desc"
        }).then((res) => setNeighborhoods(res.data))
        }
      }, [uid])

      useEffect(() => {
        if (uid.length > 0) {
          axios.post('/api/listOrdered', {
            uid: uid,
            collectionName: "users",
            field: "points",
            direction: "desc"
        }).then((res) => setTopContributors(res.data))
        }
      }, [uid])

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
        <Flex>
            <Flex w={'20%'}>
                <Sidenav/>
            </Flex>
            <Flex flexDir={'column'} w={'80%'} ml={'20px'} mt={'15px'}>
                <Heading>Leaderboard</Heading>
                <Flex flexDir={'column'} mt={'30px'}>
                    <Text fontSize={'lg'} fontWeight={'bold'}>Top City Contributers</Text>
                    <HStack>
                        {topContributors.slice(0, 5).map((item) => (
                            <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} p={'20px'}>
                                <Image w={"100px"} aspectRatio={1} objectFit={'cover'} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"} borderRadius={'50%'}/>
                                <Text fontSize={'lg'} mt={'5px'}>{item.name}</Text>
                            </Flex>
                        ))}
                    </HStack>
                        <TableContainer pb={5}>
                        <Table variant='simple'>                            
                            <Thead>
                            <Tr>
                                <Th>Rank</Th>
                                <Th>Neighbourhood</Th>
                                <Th isNumeric>Points</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            {neighborhoods.slice(0, 10).map((item, index) => (
                                <Tr>
                                    <Td>{index + 1}</Td>
                                    <Td>{item.name}</Td>
                                    <Td isNumeric>{item.points}</Td>
                                </Tr>
                            ))}
                            </Tbody>                            
                        </Table>
                        </TableContainer>
                </Flex>
            </Flex>

         


        </Flex>
        
    )
}

export default Leaderboard