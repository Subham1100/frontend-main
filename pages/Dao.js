import React, { useEffect, useState } from "react";
import Link from "next/link";

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
  Input,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import contract_config from "./contractData/contractConfig";
import DaoEvent from "./components/DaoEvent";

function Dao(props) {
  // const [daoEventCode, setDaoEventCode] = useState();
  const {
    data: totalEvents,
    isError,
    isLoading,
  } = useContractRead({
    ...contract_config,
    functionName: "next_event_proposal",
  });
  const showEvents = () => {
    let arr = [];

    for (let i = totalEvents - 1; i >= 1; i--) {
      arr.push(
        <DaoEvent
          suppressHydrationWarning
          eventId={i}
          user={props.user}
        ></DaoEvent>
      );
    }
    return arr;
  };

  // useEffect(() => {
  //   setDaoEventCode(showEvents());
  // }, []);

  return (
    // <Box>

    <Box width="60%" >
      <UnorderedList>{showEvents()}</UnorderedList>
    </Box>
  );
}
export default Dao;
