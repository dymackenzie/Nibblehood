import Sidenav from "@/components/Sidenav"
import User from "@/components/User"
import { Card, CardBody, CardHeader, Flex, Text, Heading, Image, HStack, Box, Divider } from "@chakra-ui/react"

const Neighbourhood = () => {

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
                    <User/>
                    <User/>
                    <User/>
                </HStack>
                <Text fontSize={'2xl'} fontWeight={'bold'}>Recent Activity</Text>
                <Card maxW={'40%'}>
                    <CardBody pb={1}>
                        <Image borderRadius={'lg'} aspectRatio={1.3} objectFit={'cover'} src={'data:image/jpeg;base64,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'}/>
                        <Divider/>
                        <Text fontSize={'xl'} fontWeight={'bold'} py={3}>Cucumbers</Text>
                        <Divider/>
                        <Flex justifyContent={'space-between'}>
                            <Text>44 min ago</Text>
                            <Text>John Doe</Text>
                        </Flex>
                    </CardBody>
                </Card>
            </Flex>

            </Flex>
        </Flex>
        </Flex>
    )
}

export default Neighbourhood