import { Button, Flex, Icon, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { GiVillage } from "react-icons/gi"
import { IoMdTrophy } from "react-icons/io"
import { IoHomeSharp } from "react-icons/io5"
import PostFood from "./PostFood"

const Sidenav = () => {
    const router = useRouter()
    
    const isHome = router.pathname === "/"
    const isNeighbourhood = router.pathname === "/neighbourhood"
    const isLeaderboard = router.pathname === "/leaderboard"

    return (
        <Flex pos={'fixed'} h={'90vh'} flexDir={'column'} alignItems={'center'} w={'19%'} borderRight={'2px solid #F1F1F1'}>
            <Flex w={"100%"} h={'4vh'} mt={'30px'}>
                <Button onClick={() => router.push('/')} borderRadius={'100px'} justifyContent={'left'} w={'80%'} bgColor={isHome ? '#f1f1f1' : 'white'} color={isHome ? '#606060' : 'black'} ml={'10%'} leftIcon={<Icon as={IoHomeSharp}/>}>Home</Button>
            </Flex>
            <Flex w={"100%"} h={'4vh'} mt={2}>
                <Button onClick={() => router.push('/neighbourhood')} borderRadius={'100px'} justifyContent={'left'} w={'80%'} bgColor={isNeighbourhood ? '#f1f1f1' : 'white'} color={isNeighbourhood ? '#606060' : 'black'} ml={'10%'} leftIcon={<Icon as={GiVillage}/>}>Neighbourhood</Button>
            </Flex>
            <Flex w={"100%"} h={'4vh'} mt={2}>
                <Button onClick={() => router.push('/leaderboard')} borderRadius={'100px'} justifyContent={'left'} w={'80%'} bgColor={isLeaderboard ? '#f1f1f1' : 'white'} color={isLeaderboard ? '#606060' : 'black'} ml={'10%'} leftIcon={<Icon as={IoMdTrophy}/>}>Leaderboards</Button>
            </Flex>
            <Flex position={'fixed'} bottom={'20px'}>
                <PostFood/>
            </Flex>
        </Flex>
    )
}

export default Sidenav