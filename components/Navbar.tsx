import { Box, Button, Flex, IconButton, Image, Text } from "@chakra-ui/react"
import { FaLocationDot } from "react-icons/fa6"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth } from "@/firebase/clientApp"
import axios from "axios"
import Account from "@/types/Account"
import { IoLogOutOutline, IoPerson } from "react-icons/io5"

const Navbar = () => {
    const router = useRouter()
    const [user, setUser] = useState<Account>()
    const [uid, setUID] = useState("")

    const logout = () => {
        auth.signOut().then(() => router.reload());
    }

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
            h={'10vh'}
            >
            <Flex justifyContent={'left'} alignItems={'left'} w={'20%'} fontSize={'xl'} cursor={'pointer'} onClick={() => router.push('/')}>
                <Image h={'100%'} src={'/nibblehood_logo.svg'} padding={'2rem'}/>
            </Flex>
            <Flex justifyContent={'left'} alignItems={'center'} w={'60%'} fontSize={'2xl'}>
                <FaLocationDot/>
                <Text ml={2}>{user?.neighborhoodName}</Text>
            </Flex>       
            {     
            user ? <Flex w={'18%'} justifyContent={'right'} alignItems={'center'}>
                <Flex alignItems={'center'} marginRight={'2rem'}>
                    <IoPerson fontSize={'20px'}/>
                    <Text ml={3} fontSize={'2xl'}>{user.name}</Text>
                </Flex>
                <IconButton as={IoLogOutOutline} onClick={logout} size={'md'} p={1} aria-label="logout"/>
                </Flex> :
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