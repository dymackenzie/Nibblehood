import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { FaLocationDot } from "react-icons/fa6"
import { useRouter } from "next/router"

const Navbar = () => {
    const router = useRouter()
    return (
        <Flex h={'10vh'} borderBottom={'3px solid black'}>
            <Flex justifyContent={'center'} alignItems={'center'} w={'20%'} fontSize={'xl'}>
                <Image h={'100%'} src={'https://static-00.iconduck.com/assets.00/nextjs-icon-2048x1234-pqycciiu.png'}/>
            </Flex>
            <Flex alignItems={'center'} w={'60%'} fontSize={'2xl'}>
                <FaLocationDot/>
                <Text ml={2}>Burnaby</Text>

            </Flex>            
            <Flex justifyContent={'center'} alignItems={'center'} w={'10%'} fontSize={'md'}>
                <Button onClick={() => router.push('/login')} variant={'ghost'}>Log In</Button>
            </Flex>
            <Flex justifyContent={'center'} alignItems={'center'} w={'10%'} fontSize={'md'}>
                <Button onClick={() => router.push('/signup')}>Sign Up</Button>
            </Flex>
        </Flex>
    )
}

export default Navbar