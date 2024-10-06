import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { FaLocationDot } from "react-icons/fa6"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth } from "@/firebase/clientApp"
import axios from "axios"
import Account from "@/types/Account"

const Navbar = () => {
    const router = useRouter()
    const [user, setUser] = useState<Account>()
    const [uid, setUID] = useState("")

    useEffect(() => {
        if (uid.length > 0) {
            axios.post('http://localhost:3000/api/getUser', {uid: uid}).then((res) => setUser(res.data))
        }
    }, [uid])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUID(user.uid)      
            console.log(user.uid)      
          } else {
            console.log("logged out!")
          }
        });
        return () => unsubscribe();
      }, []);

    return (
        <Flex borderBottom={'2px solid #F1F1F1'} 
            justifyContent={'space-between'}
            alignItems={'center'}
            padding={'1rem'}
            position={'relative'}
            h={'10vh'}
            >
            <Flex justifyContent={'center'} alignItems={'center'} w={'20%'} fontSize={'xl'} cursor={'pointer'} onClick={() => router.push('/')}>
                <Image h={'100%'} src={'https://static-00.iconduck.com/assets.00/nextjs-icon-2048x1234-pqycciiu.png'}/>
            </Flex>
            <Flex alignItems={'center'} w={'60%'} fontSize={'2xl'}>
                <FaLocationDot/>
                <Text ml={2}>{user?.neighborhoodName}</Text>
            </Flex>       
                {   
                user ? 
                <><Flex justifyContent={'center'} alignItems={'center'} w={'10%'} fontSize={'md'}>
                    <Text fontSize={'2xl'}>Hello, {user.name}</Text>
                </Flex>
                <Flex justifyContent={'center'} alignItems={'center'} w={'10%'} fontSize={'md'}>
                    <Button onClick={() => {auth.signOut(); router.push('/')}}>Log Out</Button> 
                </Flex></>
                :
                <><Flex justifyContent={'center'} alignItems={'center'} w={'10%'} fontSize={'md'}>
                    <Button onClick={() => router.push('/login')} variant={'ghost'}>Log In</Button>
                </Flex>
                <Flex justifyContent={'center'} alignItems={'center'} w={'10%'} fontSize={'md'}>
                    <Button onClick={() => router.push('/signup')}>Sign Up</Button>
                </Flex></>
                } 
        </Flex>
    )
}

export default Navbar