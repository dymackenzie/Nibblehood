/**
 * @file index.tsx, the main page of the app.
 * 
 * The main page of the app, where users can see available items in their neighborhood.
 */

import Head from "next/head";
import ItemType from "@/types/Item";
import { Flex, Heading, Icon, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import ItemComponent from "@/components/ItemComponent";
import Sidenav from "@/components/Sidenav";
import { auth } from "@/firebase/clientApp";

const Home: NextPage = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [uid, setUID] = useState("");

  // filter items by neighborhood of current user
  useEffect(() => {
    if (uid.length > 0) {
      axios.post('/api/listFiltered', {
        uid: uid,
        collectionName: "items",
        field: "neighborhood",
        operator: "==",
        value: "neighborhood"
      }).then((res) => setItems(res.data))
    }

  }, [uid])

  // get the current user's id
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
    <>
      <Head>
        <title>Nibblehood</title>
        <meta name="description" content="to bring close communities closer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/nibblehood_icon.png"/>
      </Head>
      <Flex>
          <Flex w={'20%'}>
            <Sidenav/>
          </Flex>
          <Flex flexDir={'column'} w={'80%'} ml={'40px'} mt={'50px'}>
              <Flex  h={'40vh'} flexDir={'row'} backgroundImage={'/green_grid.png'}
                backgroundPosition={'center'}
                backgroundSize={'cover'}
                marginLeft={'-3.3rem'}
                marginTop={'-3.1rem'}
                paddingLeft={'5rem'}>

                <Flex flexDir={'column'} justifyContent={'center'}  w={'100%'}>
                  <Heading fontSize={'8xl'} fontFamily={'ppeditorial'} fontWeight={'200'}>Pass Your Plate,</Heading>
                  <Heading fontSize={'8xl'} fontFamily={'ppeditorial'} fontWeight={'200'}>Power Your Neighbourhood!</Heading>
                  <Text mt={'20px'} fontSize={'4xl'} fontWeight={'600'} letterSpacing={'1px'}>Turn your excess food into smiles next door.</Text>                
                </Flex>

              </Flex>
            <Flex w={'95%'} mt={'80px'} justifyContent={'space-between'}>
              <Text fontSize={'4xl'} fontFamily={'ppeditorial'} fontWeight={'bold'}>Available Items</Text>
            </Flex>     
            <SimpleGrid columns={3} py={'5vh'} spacing={3} justifyContent={'space-around'} mr={3}>
              {items.map((item) => (
                (!item.claimed) && <ItemComponent item={item} />
              ))}
            </SimpleGrid>
          </Flex>                    
        </Flex> 
    </>
  );
}


export default Home;
