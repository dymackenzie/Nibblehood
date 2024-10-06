import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { Button, Flex, Text } from "@chakra-ui/react";
import Item from "@/types/Item";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/clientApp";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

type Props = {
  items: Item[]
}

const Home: NextPage<Props> = ({items}) => {

  // destructure user, loading, and error out of the hook
  const [user, loading, error] = useAuthState(auth); 

  useEffect(() => {
    console.log(items)
  }, [items])

  return (
    <>
      <Head>
        <title>Neighbourfood</title>
        <meta name="description" content="to bring close communities closer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Flex justifyContent={'space-around'} alignItems={'center'}  w={'100vw'} h={'100vh'}>
      {items.map((item) => (
        <Flex flexDir={'column'} bgColor={'red'} w={'25vw'} alignItems={'center'}>
          <Text>{item.name}</Text>
          <Image src={item.image} width={100} height={100} alt={"food pic"}/>        
          <Text size={'sm'}>{item.description}</Text>
          <Button>Claim!</Button>
          <Text>{item.points}</Text>
          <Text>{new Date(item.time).toDateString()}</Text>
          <Text>{item.account.name}</Text>
        </Flex>          
      ))}
      </Flex>
        
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/listItems") //update to post later with location
    const items: Item[] = res.data
    return {
      props: {
        items
      }        
    }
  } catch (err) {
    return {
      notFound: true
    }
  }
}

export default Home;