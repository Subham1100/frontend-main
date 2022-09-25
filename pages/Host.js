import React ,{useState} from "react";
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
  FormLabel
} from "@chakra-ui/react";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";

import contract_config from "./contractData/contractConfig";

const Host = (props) => {
    const [formState,setFormState]=useState({
        eventId:0,
        addresses:""
    })
    const formChangeHandler=(e)=>{
        if(e.target.name==="eventId"){
            setFormState({...formState,eventId:+e.target.value})
        }else{
            setFormState({...formState,addresses:e.target.value})
        }
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        console.log(formState.addresses);
    }
  return (
    <Box>
      <form onSubmit={submitHandler} marginTop="2rem">
        <FormControl>
          <FormLabel>Event id(Caller must be the host of this eventId)</FormLabel>
          <Input type="number" name="eventId" onChange={formChangeHandler} />
        </FormControl>
        <FormControl>
          <FormLabel>Enter addresses which attended the event</FormLabel>
          <Input type="text" name="addresses" onChange={formChangeHandler} />
        </FormControl>
       
        <Button m="20px" type="submit">
          {/* <Link href="/"> */}
          <a>Submit</a>
          {/* </Link> */}
        </Button>
      </form>
    </Box>
  );
};
export default Host;
