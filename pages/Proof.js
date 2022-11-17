import React, { useState } from "react";
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
} from "@chakra-ui/react";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { File } from "web3.storage";
import makeStorageClient from "./components/storageClient";

import contract_config from "./contractData/contractConfig";

const Proof = (props) => {
  const [formState, setFormState] = useState({
    eventId: 0,
    cid: "",
  });

  const getImageLink = async () => {
    // get file
    const file = document.querySelector('input[type="file"]');

    // upload file
    const client = makeStorageClient();
    const cid = await client.put(file.files);

    // construct file url and return
    const imageUri = `https://${cid}.ipfs.dweb.link/${file.files[0].name}`;

    return imageUri;
  };

  const { config } = usePrepareContractWrite({
    ...contract_config,
    functionName: "submitProof",
    args: [formState.eventId, formState.cid],
  });

  const { write } = useContractWrite(config);

  const formChangeHandler = (e) => {
    if (e.target.name === "eventId") {
      setFormState({ ...formState, eventId: +e.target.value });
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const _cid = await getImageLink();
    setFormState({ ...formState, cid: _cid });
    console.log(_cid);
    write?.();
  };
  return (
    <Box width="70%">
      <form onSubmit={submitHandler}>
        <FormControl>
          <FormLabel fontSize="20px">Event id</FormLabel>
          <Input
            boxShadow="lg"
            type="number"
            name="eventId"
            onChange={formChangeHandler}
          />
        </FormControl>
        <FormControl>
          <FormLabel my="20px" fontSize="20px">
            Proof image
          </FormLabel>
          <Input
            boxShadow="lg"
            type="file"
            name="image"
            onChange={formChangeHandler}
          />
        </FormControl>
        {props.user ? (
          <Button type="submit" marginTop="3rem">
            Submit
          </Button>
        ) : (
          <Button type="submit" disabled={true} marginTop="3rem">
            Not connected
          </Button>
        )}
      </form>
    </Box>
  );
};
export default Proof;
