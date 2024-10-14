/**
 * @file User.tsx, a TypeScript file that defines the User functional component.
 */

import { Flex, Image, Text } from "@chakra-ui/react"

const User = ({name}:{name:string}) => {
    return (
        <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} p={'20px'}>
            <Image w={"100px"} aspectRatio={1} objectFit={'cover'} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"} borderRadius={'50%'}/>
            <Text fontSize={'lg'}>{name}</Text>
        </Flex>
    )
}

export default User