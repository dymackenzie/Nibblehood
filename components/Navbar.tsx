/**
 * @file Navbar.tsx, a TypeScript file that defines the Navbar functional component.
 * 
 * This component is used to display the navigation bar at the top of the page.
 * In the navigation bar, the user can see the neighborhood they are in, their name, and the number of points they have.
 * If the user is not logged in, they can log in or sign up.
 * If the user is logged in, they can see their name and points, and log out.
 */

import { Button, Flex, IconButton, Image, Text } from "@chakra-ui/react"
import { FaLocationDot } from "react-icons/fa6"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth } from "@/firebase/clientApp"
import axios from "axios"
import Account from "@/types/Account"
import { IoLogOutOutline, IoPerson } from "react-icons/io5"
import { MdStars } from "react-icons/md"

const Navbar = () => {
    const router = useRouter()
    const [user, setUser] = useState<Account>()
    const [uid, setUID] = useState("")

    // logout function
    const logout = () => {
        auth.signOut().then(() => router.reload());
    }

    // get user data
    useEffect(() => {
        if (uid.length > 0) {
            axios.post('/api/getUser', {uid: uid}).then((res) => setUser(res.data))
        }
    }, [uid])

    // check if user is logged in
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
        <Flex borderBottom={'2px solid #5F802C'} h={'10vh'}>
            <Flex justifyContent={'left'} alignItems={'left'} w={'20%'} fontSize={'xl'} cursor={'pointer'} onClick={() => router.push('/')}>
                <Image h={'100%'} src={'/nibblehood_logo.svg'} padding={'2rem'}/>
            </Flex>
            <Flex justifyContent={'left'} alignItems={'center'} w={'60%'} fontSize={'2xl'}>
                <FaLocationDot/>
                <Text ml={2}>{user?.neighborhoodName}</Text>
            </Flex>
            {
            // if user is logged in, display user info and logout button
            // else, display login and signup buttons
            user ? 
            <Flex w={'18%'} justifyContent={'right'} alignItems={'center'} fontSize={'xl'}>
                <Flex>
                    <Flex alignItems={'center'} marginRight={'2rem'}>
                        <IoPerson />
                        <Text ml={3} >{user.name}</Text>
                    </Flex>
                    <Flex alignItems={'center'} marginRight={'2rem'}>
                        <MdStars />
                        <Text ml={3} >{user.points}</Text>
                    </Flex>
                </Flex>
                <IconButton as={IoLogOutOutline} variant={'ghost'} onClick={logout} size={'md'} p={1} aria-label="logout"/>
            </Flex> 
                :
            <>
                <Flex justifyContent={'center'} alignItems={'center'} w={'10%'} fontSize={'md'}>
                    <Button onClick={() => router.push('/login')} variant={'ghost'}>Log In</Button>
                </Flex>
                <Flex justifyContent={'center'} alignItems={'center'} w={'10%'} fontSize={'md'}>
                    <Button onClick={() => router.push('/signup')}>Sign Up</Button>
                </Flex>
            </>
            }
        </Flex>
    )
}

export default Navbar