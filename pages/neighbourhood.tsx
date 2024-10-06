import Sidenav from "@/components/Sidenav"
import { Card, CardBody, CardHeader, Flex, Text, Heading, Image, HStack, Divider, IconButton } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import axios from "axios"
import { auth } from "@/firebase/clientApp"
import Account, { accountConverter } from "@/types/Account"
import Item, { itemConverter } from "@/types/Item"
import Neighborhood from "@/types/Neighborhood"

const Neighbourhood = () => {

    const [user, setUser] = useState<Account>()
    const [recentActivity, setRecentActivity] = useState<Item[]>([]);
    const [topContributors, setTopContributors] = useState<Account[]>([]);
    const [neighborhood, setNeighborhood] = useState<Neighborhood>();
    const [ranking, setRanking] = useState(0);
    const [uid, setUID] = useState("");

    useEffect(() => {
        if (uid.length > 0) {
            axios.post('/api/listFiltered', {
                uid: uid,
                collectionName: "items",
                field: "neighborhood",
                operator: "==",
                value: "neighborhood"
            }).then((res) => setRecentActivity(res.data))
        }
    }, [uid])
    //TODO: change to be top residents, not all residents
    useEffect(() => {
        if (uid.length > 0) {
            axios.post('/api/listFiltered', {
                uid: uid,
                collectionName: "users",
                field: "neighborhood",
                operator: "==",
                value: "neighborhood"
            }).then((res) => setTopContributors(res.data))
        }
    }, [uid])

    useEffect(() => {
        if (uid.length > 0) {
            axios.post('/api/listOrdered', {
                uid: uid,
                direction: "desc",
                field: "points",
                collectionName: "neighborhoods",
            }).then((res) => {
                const neighborhoodsDesc = res.data;
                for (let index = 0; index < neighborhoodsDesc.length; index++) {
                    const element = neighborhoodsDesc[index];
                    if (element.name === neighborhood?.name) {
                        setRanking(index + 1);
                    }
                }
            })
        }
    }, [uid])

    useEffect(() => {
        if (uid.length > 0) {
            axios.post('/api/getNeighborhood', {
                uid: uid
            }).then((res) => setNeighborhood(res.data))
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
                <Sidenav />
            </Flex>

            <Flex flexDir={'column'} w={'80%'} ml={'20px'} mt={'15px'} pb={5}>
                <Flex marginLeft={5}>
                    <Heading fontSize="5xl" mb={5}>{neighborhood?.name}</Heading>
                </Flex>
                <Flex  >
                    {/* Main Neighborhood Card */}
                    <Card w={'45%'} mt={'20px'} p={5} h={'fit-content'} boxShadow='lg' borderRadius='lg'>
                        <CardHeader>
                            <Flex flexDir={'column'} alignItems={'center'}>
                                <Image src={'https://upload.wikimedia.org/wikipedia/commons/0/00/Burnaby_Metrotown_skyline.jpg'} borderRadius="lg" mb={3} />
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Flex justifyContent={'space-around'} mb={3}>
                                <Flex flexDir={'column'} alignItems={'center'}>
                                    <Text fontWeight="bold" fontSize="2xl">{ranking}</Text>
                                    <Text fontSize="sm">Rank</Text>
                                </Flex>

                                <Flex flexDir={'column'} alignItems={'center'}>
                                    <Text fontWeight="bold" fontSize="2xl">{topContributors.length}</Text>
                                    <Text fontSize="sm">Members</Text>
                                </Flex>

                                <Flex flexDir={'column'} alignItems={'center'}>
                                    <Text fontWeight="bold" fontSize="2xl">{recentActivity.length}</Text>
                                    <Text fontSize="sm">Plate Passes</Text>
                                </Flex>
                            </Flex>
                            <Divider borderColor={'rgb(95, 128, 44)'} />
                            <Flex justifyContent={'space-around'} mt={3}>
                                <Flex flexDir={'column'} alignItems={'center'}>
                                    <Text fontWeight="bold" fontSize="2xl">{(neighborhood?.points || 0) / 10} kg</Text>
                                    <Text fontSize="sm">Food Saved</Text>
                                </Flex>
                                <Flex flexDir={'column'} alignItems={'center'}>
                                    <Text fontWeight="bold" fontSize="2xl">{neighborhood?.points}</Text>
                                    <Text fontSize="sm">Points Raised</Text>
                                </Flex>
                            </Flex>
                        </CardBody>
                    </Card>

                    {/* Top Contributors Section */}
                    <Flex flexDir={'column'} w={'50%'} ml={'50px'} mt={'20px'}>
                        <Flex justifyContent={'space-between'} alignItems="center">
                            <Text fontSize={'2xl'} fontWeight={'bold'}>Top Contributors</Text>
                            <Flex alignItems={'center'}>
                                <Text fontSize="sm" color="gray.500">See All</Text>
                                <IconButton aria-label="left" icon={<ChevronLeftIcon />} variant="ghost" />
                                <IconButton aria-label="right" icon={<ChevronRightIcon />} variant="ghost" />
                            </Flex>
                        </Flex>
                        <HStack spacing={6} mt={5}>
                            {topContributors.slice(0, 5).map((item, index) => (
                                <Flex key={index} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
                                    <Image w={"75px"} h={"75px"} objectFit={'cover'} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"} borderRadius={'50%'} />
                                    <Text fontSize={'md'} mt={'5px'}>{item.name}</Text>
                                </Flex>
                            ))}
                        </HStack>
                        <Flex justifyContent={'space-between'} alignItems="center" mt={'30px'}>
                            <Text fontSize={'2xl'} fontWeight={'bold'}>Recent Activity</Text>
                            <Flex alignItems={'center'}>
                                <Text fontSize="sm" color="gray.500">See All</Text>
                                <IconButton aria-label="left" icon={<ChevronLeftIcon />} variant="ghost" />
                                <IconButton aria-label="right" icon={<ChevronRightIcon />} variant="ghost" />
                            </Flex>
                        </Flex>
                        <Flex flexDirection='row' wrap='nowrap' justifyContent='left'>
                            {recentActivity.slice(0, 3).map((item, index) => (
                                <Card key={index} maxW={'200px'} m={2}>
                                    <CardBody pb={1}>
                                        <Image w={"100%"} h={'40%'} borderRadius={'lg'} objectFit={'cover'} src={item.image} />    
                                        <Flex justifyContent={'center'} pb={3}>
                                            <Text fontSize={'xl'} fontWeight={'bold'} py={3}>{item.name}</Text>
                                        </Flex>                                    
                                        <Divider border={'1px solid rgb(95, 128, 44)'}/>                                        
                                        <Flex justifyContent={'left'}>
                                            <Text>{item.accountName}</Text>                                            
                                        </Flex>
                                    </CardBody>
                                </Card>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex >
    )
}

export default Neighbourhood