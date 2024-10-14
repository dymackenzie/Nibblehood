/**
 * @file Sidenav.tsx, a TypeScript file that defines the Sidenav functional component.
 * 
 * This component is used to display the side navigation bar on the left side of the page.
 * The side navigation bar includes buttons for the home page, neighborhood page, and leaderboard page.
 * The user can also post a new food item from this component.
 */

import { Button, Flex, Icon } from "@chakra-ui/react"
import { useRouter } from "next/router"
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
        <Flex pos={'fixed'} h={'120vh'} flexDir={'column'} alignItems={'center'} w={'18%'} borderRight={'2px solid #5F802C'}>
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