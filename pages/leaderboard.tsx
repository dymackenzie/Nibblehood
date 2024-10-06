import Sidenav from "@/components/Sidenav"
import User from "@/components/User"
import { Flex, Heading, HStack, Image, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"

const Leaderboard = () => {

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

                        <User/>
                        <User/>
                        <User/>

                        
                    </HStack>                    
                        <TableContainer>
                        <Table variant='simple'>
                            <TableCaption>Neighbourhood Rankings</TableCaption>
                            <Thead>
                            <Tr>
                                <Th>Rank</Th>
                                <Th>Neighbourhood</Th>
                                <Th isNumeric>Points</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            <Tr>
                                <Td>1</Td>
                                <Td>Kits</Td>
                                <Td isNumeric>25343</Td>
                            </Tr>
                            <Tr>
                                <Td>2</Td>
                                <Td>Burnaby</Td>
                                <Td isNumeric>21832</Td>
                            </Tr>
                            <Tr>
                                <Td>3</Td>
                                <Td>Dunbar</Td>
                                <Td isNumeric>19273</Td>
                            </Tr>
                            </Tbody>                            
                        </Table>
                    </TableContainer>
                    
                </Flex>
            </Flex>

         


        </Flex>
        
    )
}

export default Leaderboard