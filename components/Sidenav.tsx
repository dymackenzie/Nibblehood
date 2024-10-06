import { Button, Flex, Icon, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { GiVillage } from "react-icons/gi"
import { IoMdTrophy } from "react-icons/io"
import { IoHomeSharp } from "react-icons/io5"
import PostFood from "./PostFood"

const Sidenav = () => {
    const router = useRouter()
    return (
        <Flex h={'90vh'} flexDir={'column'} alignItems={'center'} w={'100%'} borderRight={'2px solid #F1F1F1'}>
            <Flex w={"100%"} h={'10vh'} mt={'30px'}>
                <Button onClick={() => router.push('/')} justifyContent={'left'} w={'80%'} bgColor={'white'} ml={'10%'} leftIcon={<Icon as={IoHomeSharp}/>}>Home</Button>
            </Flex>
            <Flex w={"100%"} h={'10vh'} mt={2}>
                <Button onClick={() => router.push('/neighbourhood')} justifyContent={'left'} w={'80%'} bgColor={'white'} ml={'10%'} leftIcon={<Icon as={GiVillage}/>}>Neighbourhood</Button>
            </Flex>
            <Flex w={"100%"} h={'10vh'} mt={2}>
                <Button onClick={() => router.push('/leaderboard')} justifyContent={'left'} w={'80%'} bgColor={'white'} ml={'10%'} leftIcon={<Icon as={IoMdTrophy}/>}>Leaderboards</Button>
            </Flex>
            <Flex position={'fixed'} bottom={'20px'}>
                <PostFood/>
            </Flex>
        </Flex>
    )
}

export default Sidenav