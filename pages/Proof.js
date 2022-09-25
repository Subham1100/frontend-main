import React from "react";
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
} from "@chakra-ui/react";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";

import contract_config from "./contractData/contractConfig";

const Proof = () => {
  return <Box>Proof</Box>;
};
export default Proof;
