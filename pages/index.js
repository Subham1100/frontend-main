import React, { useEffect, useState } from "react";
import {
  Container,
  Text,
  Flex,
  Box,
  Heading,
  Spacer,
  Button,
  Center,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import contract_config from "./contractData/contractConfig";
// import styles from "./css/index.module.css";
// import Register from "./components/Register";
import dynamic from "next/dynamic";
// import Dao from "./Dao";
const Register = dynamic(() => import("./Register"), { ssr: false });
const Dao = dynamic(() => import("./Dao"), { ssr: false });
const BookEvent = dynamic(() => import("./BookEvent"), { ssr: false });
const Host = dynamic(() => import("./Host"), { ssr: false });
const Proof = dynamic(() => import("./Proof"), { ssr: false });

function App() {
  const { address, isConnected } = useAccount();
  // const [arr, setArr] = useState([]);

  // const getEvents = () => {
  //   const {
  //     data: totalEvents,
  //     isError,
  //     isLoading,
  //   } = useContractRead({
  //     ...contract_config,
  //     functionName: "next_event_proposal",
  //   });

  //   for (let i = 1; i < totalEvents; i++) {
  //     const { data: event } = useContractRead({
  //       ...contract_config,
  //       functionName: "event_proposals",
  //       args: [i],
  //     });
  //     console.log(event);
  //     arr.push(event);
  //   }
  //   // setEvents(arr);
  //   console.log(arr);
  //   setArr(arr);
  //   // return arr;

  //   // return (
  //   //   <ul>
  //   //     {arr.map((event, index) => (
  //   //       <li>ehiokoj</li>
  //   //     ))}
  //   //     {/* bcudefufyu */}
  //   //   </ul>
  //   // );
  // };
  // useEffect(() => {
  //   getEvents();
  // }, []);

  return (
    <Box
      bgGradient="linear(to-r, blue.200, white.500)"
      // className={styles.container}
      paddingBottom="18px"
      paddingRight="18px"
      paddingLeft="18px"
      _dark
    >
      <Flex
        justifyContent="space-between"
        marginBottom="10"
        border="2px"
        borderColor="black"
      >
        <Box m={(10, 15)}>Logo</Box>
        {/* <Spacer /> */}
        <Heading textAlign="center" fontSize="6xl" m={(20, 10)}>
          Nature2earn
        </Heading>
        <Box margin="1rem">
          <ConnectButton />
        </Box>
      </Flex>
      <Tabs size="lg" colorScheme="purple" align="center" variant="enclosed">
        <TabList>
          <Tab fontWeight="bold">Home</Tab>
          <Tab fontWeight="bold">Events</Tab>
          <Tab fontWeight="bold">DAO</Tab>
          <Tab fontWeight="bold">Host</Tab>
          <Tab fontWeight="bold">Submit proof</Tab>
          {/* <Tab fontWeight="bold</Tab> */}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading marginTop="4rem" fontFamily="cursive">
              Rewarding people for connecting with nature
            </Heading>
            <Text width="70%" marginTop="4rem">
              Nature-to-Earn (N2E) is a purpose-driven token that rewards people
              for getting out into nature. We believe that connecting with
              nature pushes people to take better care of nature. By having N2E
              validators facilitate nature events (e.g. hikes, mushroom forays,
              beach cleanups, etc), we can verify people's participation in
              nature events & reward them accordingly{" "}
            </Text>
          </TabPanel>
          <TabPanel>
            <Register user={address} />
          </TabPanel>
          <TabPanel>
            <Dao user={address}></Dao>
          </TabPanel>
          <TabPanel>
            <Host user={address}></Host>
          </TabPanel>
          <TabPanel>
            <Proof user={address}></Proof>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;
