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
            //setUser(user);
            //getUserProfile(user.uid);
          } else {
            //setUser(null);
            //setProfile(null);
            console.log("logged out!")
          }
        });
        return () => unsubscribe();
      }, []);

    return (
        <Flex h={'10vh'} borderBottom={'2px solid #F1F1F1'}>
            <Flex justifyContent={'center'} alignItems={'center'} w={'20%'} fontSize={'xl'} cursor={'pointer'} onClick={() => router.push('/')}>
                <Image h={'100%'} src={'https://static-00.iconduck.com/assets.00/nextjs-icon-2048x1234-pqycciiu.png'}/>
            </Flex>
            <Flex alignItems={'center'} w={'60%'} fontSize={'2xl'}>
                <FaLocationDot/>
                <Text ml={2}>{user?.neighborhoodName}</Text>

            </Flex>       
            {     
            user ? <Flex w={'18%'} justifyContent={'space-between'} alignItems={'center'}>
                <Flex alignItems={'center'}>
                    <IoPerson fontSize={'20px'}/>
                    <Text ml={3} fontSize={'2xl'}>{user.name}</Text>
                </Flex>
                <IconButton as={IoLogOutOutline} onClick={logout} size={'md'} p={1}/>
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