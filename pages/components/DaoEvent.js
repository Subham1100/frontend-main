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
  useBlockNumber,
} from "wagmi";
import contract_config from "../contractData/contractConfig";
import abi from "../contractData/abi.json";

function DaoEvent(props) {
  // const [btnCode, setBtnCode] = useState();
  const { data: event } = useContractRead({
    ...contract_config,
    functionName: "event_proposals",
    args: [props.eventId],
  });
  // console.log(event);
  const { data: num } = useContractRead({
    ...contract_config,
    functionName: "DAO_membership_status_mapping",
    args: [props.user],
  });
  const { data: hasVoted } = useContractRead({
    ...contract_config,
    functionName: "hasVoted",
    args: [props.user, props.eventId],
  });
  const { data: isNotOver } = useContractRead({
    ...contract_config,
    functionName: "isDeadlineCrossed",
    args: [props.eventId],
  });
  // console.log(isNotOver);
  const { config: voteF } = usePrepareContractWrite({
    ...contract_config,
    functionName: "voteForEvent",
    args: [props.eventId, true],
  });
  const {
    data: voteF_data,
    isLoading: voteF_loading,
    isSuccess: voteF_isSuccess,
    write: voteF_write,
  } = useContractWrite(voteF);

  const { config: voteA } = usePrepareContractWrite({
    ...contract_config,
    functionName: "voteForEvent",
    args: [props.eventId, false],
  });
  const {
    data: voteA_data,
    isLoading: voteA_isLoading,
    isSuccess: voteA_isSuccess,
    write: voteA_write,
  } = useContractWrite(voteA);
  const { config: countVotes } = usePrepareContractWrite({
    ...contract_config,
    functionName: "countVotes",
    args: [props.eventId],
  });
  const {
    isLoading: counting,
    isSuccess: counting_isSuccess,
    write: counting_write,
  } = useContractWrite(countVotes);
  const { data: blockNum } = useBlockNumber();

  const btn = () => {
    if (!props.user) {
      return <Button disabled>Not connected</Button>;
    } else if (num != 2) {
      return <Button disabled>Not DAO member</Button>;
    } else if (event.status == 1 && blockNum > event.deadline) {
      return <Button onClick={() => counting_write?.()}>Count votes</Button>;
    } else if (event.status === 2) {
      return (
        <Button disabled backgroundColor="lightgreen">
          Passed
        </Button>
      );
    } else if (event.status === 3) {
      return (
        <Button disabled backgroundColor="red.400">
          Rejected
        </Button>
      );
    } else if (hasVoted) {
      return <Button disabled>Already voted</Button>;
    } else if (!isNotOver) {
      if (event.status != 2) {
        return (
          <Button backgroundColor="red.400" disabled>
            Event deadline over
          </Button>
        );
      } else {
        return (
          <Button backgroundColor="lightgreen" disabled>
            Event deadline over
          </Button>
        );
      }
    } else {
      return (
        <Box>
          {/* {blockNum > event.deadline ? (
            <Button marginRight="5px">Count </Button>
          ) : ( */}
          <>
            <Button marginRight="5px" onClick={() => voteF_write?.()}>
              For
            </Button>
            <Button onClick={() => voteA_write?.()}>Against</Button>
          </>
          {/* )} */}
        </Box>
      );
    }
  };

  // useEffect(() => {
  //   const code = btn();
  //   setBtnCode(code);
  // }, []);

  return (
    <>
      {event ? (
        <ListItem
          border="2px"
          borderColor="white"
          p="10px 15px"
          m="18px"
          borderRadius="20px"
        >
          <Flex pd="2px" justifyContent="space-between" alignItems="center">
            <Box>
              <Heading size="md">{event.name}</Heading>
            </Box>
            <Button>Details</Button>
            <Flex>
              <Flex
                justifyContent="center"
                alignItems="center"
                marginRight="5px"
              >
                <Heading fontSize="1.2rem">
                  {" "}
                  👍 {event.votesUp.toNumber()} : {event.votesDown.toNumber()}{" "}
                  👎
                </Heading>
              </Flex>
              {btn()}
            </Flex>
          </Flex>
          {/* {props.event.name} */}
        </ListItem>
      ) : (
        ""
      )}
    </>
  );
}

export default DaoEvent;
