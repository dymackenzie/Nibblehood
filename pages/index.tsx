import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
//import styles from "@/styles/Home.module.css";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import Item from "@/types/Item";
import { useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";

import dynamic from 'next/dynamic'
import ItemComponent from "@/components/Item";
import Sidenav from "@/components/Sidenav";

const Test = dynamic(() => import('@/components/Test'), {
  ssr: false
})
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/clientApp";
import SignUp from "./components/signup";
import LogIn from "./components/login";



type Props = {
  items: Item[]
}

const Home: NextPage = () => {

  // destructure user, loading, and error out of the hook
  const [user, loading, error] = useAuthState(auth);

  /*
  useEffect(() => {
    axios.get('http://localhost:3000/api/listItems').then((res) => console.log(res.data))
  }, [])
  */


  return (
    <>
      <Head>
        <title>Neighbourfood</title>
        <meta name="description" content="to bring close communities closer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Flex>

        <Flex w={'20%'}>
          <Sidenav />
        </Flex>

        <Flex flexDir={'column'} w={'80%'} ml={'40px'} mt={'50px'}>

          <Flex h={'40vh'} flexDir={'row'}>

            <Flex flexDir={'column'} justifyContent={'center'} w={'100%'}>
              <Heading fontSize={'6xl'}>Pass Your Plate,</Heading>
              <Heading fontSize={'6xl'}>Power Your Neighbourhood!</Heading>
              <Text fontSize={'4xl'}>Turn your excess food into smiles next door</Text>
              <Button width={'200px'} mt={'20px'} size={'lg'} p={5}>Join Now!</Button>
            </Flex>

          </Flex>

          <Flex w={'95%'} mt={'80px'} justifyContent={'space-between'}>
            <Text fontSize={'4xl'} fontWeight={'bold'}>Fresh Finds</Text>
            <Input maxW={'300px'} border={'2px solid black'} />
          </Flex>




        </Flex>

        <Flex w={'95%'} mt={'80px'} justifyContent={'space-between'}>
          <Text fontSize={'4xl'} fontWeight={'bold'}>Fresh Finds</Text>
          <Input maxW={'300px'} border={'2px solid black'} />
        </Flex>
        <Flex py={'5vh'} justifyContent={'space-around'}>
          {/*items.map((item) => (
              <ItemComponent item={item} />
            ))*/}
        </Flex>
        <LogIn />
      </Flex>

    </>
  );
}

/*
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    console.log('attempting to fetch items from server');
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
*/
export default Home;
