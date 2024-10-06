import Sidenav from "@/components/Sidenav"
import { Card, CardBody, CardHeader, Flex, Text, Heading, Image, HStack, Divider } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axios from "axios"
import { auth } from "@/firebase/clientApp"
import Account, { accountConverter } from "@/types/Account"
import Item, { itemConverter } from "@/types/Item"

const Neighbourhood = () => {

    const [recentActivity, setRecentActivity] = useState<Item[]>([]);
    const [topContributors, setTopContributors] = useState<Account[]>([]);
    const [uid, setUID] = useState("");

    useEffect(() => {
        if (uid.length > 0) {
          axios.post('http://localhost:3000/api/listFiltered', {
            uid: uid,
            collectionName: "items",
            field: "neighborhood",
            operator: "==",
            value: "neighborhood",
            converter: itemConverter
        }).then((res) => setRecentActivity(res.data))
        }
      }, [uid])

      useEffect(() => {
        if (uid.length > 0) {
          axios.post('http://localhost:3000/api/listFiltered', {
            uid: uid,
            collectionName: "users",
            field: "neighborhood",
            operator: "==",
            value: "neighborhood",
            converter: accountConverter
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
            <Heading>Neighbourhood</Heading>
            <Flex>
            <Card w={'40%'} mt={'20px'} h={'fit-content'}>
                <CardHeader>
                    <Flex flexDir={'column'} alignItems={'center'}>
                        <Text fontSize={'2xl'} fontWeight={'bold'}>Burnaby</Text>
                        <Image src={'https://upload.wikimedia.org/wikipedia/commons/0/00/Burnaby_Metrotown_skyline.jpg'}/>                        
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Flex justifyContent={'space-around'}>
                        <Flex flexDir={'column'} w={'100px'}>
                            <Text>46</Text>
                            <Text>members</Text>
                        </Flex>
                        
                        <Flex flexDir={'column'}  w={'100px'}>
                            <Text>106</Text>
                            <Text>plates passed</Text>
                        </Flex>
                    </Flex>
                    <Flex justifyContent={'space-around'}>
                        <Flex flexDir={'column'}  w={'100px'}>
                            <Text>5</Text>
                            <Text>rank</Text>
                        </Flex>
                        <Flex flexDir={'column'}  w={'100px'}>
                            <Text>46</Text>
                            <Text>points</Text>
                        </Flex>
                    </Flex>
                    
                </CardBody>
            </Card>

            <Flex flexDir={'column'} w={'60%'} ml={'50px'} mt={'20px'}>
                <Text fontSize={'2xl'} fontWeight={'bold'}>Top Contributers</Text>
                <HStack>
                    {topContributors.slice(0, 5).map((item) => (
                        <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} p={'20px'}>
                            <Image w={"100px"} aspectRatio={1} objectFit={'cover'} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"} borderRadius={'50%'}/>
                            <Text fontSize={'lg'}>{item.name}</Text>
                        </Flex>
                    ))}
                </HStack>
                <Text fontSize={'2xl'} fontWeight={'bold'}>Recent Activity</Text>
                <Card maxW={'40%'}>
                    {recentActivity.slice(0, 10).map((item) => (
                        <CardBody pb={1}>
                            <Image borderRadius={'lg'} aspectRatio={1.3} objectFit={'cover'} src={item.image}/>
                            <Divider/>
                            <Text fontSize={'xl'} fontWeight={'bold'} py={3}>{item.name}</Text>
                            <Divider/>
                            <Flex justifyContent={'space-between'}>
                                <Text>{item.time.toUTCString()}</Text>
                                <Text>{item.account}</Text>
                            </Flex>
                        </CardBody>
                    ))}
                </Card>
            </Flex>

            </Flex>
        </Flex>
        </Flex>
    )
}

export default Neighbourhood