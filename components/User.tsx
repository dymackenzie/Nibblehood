import { Flex, Image, Text } from "@chakra-ui/react"

const User = () => {
    return (
        <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} p={'20px'}>
            <Image w={"100px"} aspectRatio={1} objectFit={'cover'} src={"https://i.pinimg.com/736x/be/a3/49/bea3491915571d34a026753f4a872000.jpg"} borderRadius={'50%'}/>
            <Text fontSize={'lg'}>Mamao</Text>
        </Flex>
    )
}

export default User