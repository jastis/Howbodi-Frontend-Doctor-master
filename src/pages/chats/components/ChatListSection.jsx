import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Divider,
  Text,
} from "@chakra-ui/react";
import { VisitationDetails } from "../../dashboard/components/VisitationDetails";
import { SearchBar } from "../../../components/SearchBar";
import { searchPatient } from "../services";
import debounce from "lodash.debounce";
import dayjs from "dayjs";

export const ChatListSection = ({
  setDisplayChat,
  activeIndex,
  setActiveIndex,
  setDisplayOrHideChatFeedForSmScreen,
  displayOrHideChatFeedForSmScreen,
  loading,
  contacts,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [holdDoctorsToMemory, setHoldDoctorsToMemory] = useState([]);

  useEffect(() => {
    if (contacts?.length < 1) return;
    setHoldDoctorsToMemory(contacts);
  }, [contacts]);

  const searchContact = (res) => {
    searchPatient(res)
      .then((response) => {
        setHoldDoctorsToMemory(response);
      })
      .catch(() => setHoldDoctorsToMemory(contacts));
  };

  //wait for user to finish typing before sending request
  const processSearch = debounce((res) => searchContact(res), 1000);

  return (
    <Box
      bg="#F6F4F9"
      borderRadius={"10px"}
      h={["100%", "100%", "80vh"]}
      fontSize={"12px"}
      overflow="scroll"
      pt="15px"
      overflowX="hidden"
    >
      <Box p="15px">
        <SearchBar
          inputValue={searchTerm}
          setSearchTerm={(search) => {
            setSearchTerm(search);
            processSearch(search);
          }}
          placeholder="search contacts"
        />
      </Box>
      <Divider />
      {loading ? (
        <Box p={5}>
          <Flex gap={5} alignItems="center">
            <SkeletonCircle />
            <SkeletonText noOfLines={2} spacing="4" width={"100%"} />
          </Flex>
          <Flex gap={5} alignItems="center" mt={10}>
            <SkeletonCircle />
            <SkeletonText noOfLines={2} spacing="4" width={"100%"} />
          </Flex>
        </Box>
      ) : holdDoctorsToMemory?.length < 1 ? (
        <Box p={5}>
          <Text color={"gray.500"} textAlign="center">
            {" "}
            Start a converstation{" "}
          </Text>
        </Box>
      ) : (
        holdDoctorsToMemory?.map?.((data, i) => {
          return (
            <Box
              key={i}
              onClick={() => {
                setDisplayChat(data);
                setActiveIndex(i);
                if (window.innerWidth < 760) {
                  setDisplayOrHideChatFeedForSmScreen(
                    !displayOrHideChatFeedForSmScreen
                  );
                }
              }}
              cursor="pointer"
              width="100%"
            >
              <VisitationDetails
                // px="30px"
                // bg="bg"
                bg={activeIndex === i ? "#EFEDF3" : "inherit"}
                name={`${data?.userId?.firstName} ${data?.userId?.lastName} `}
                frequency={data?.chat}
                avatar={data?.userId?.image}
                time={dayjs(data?.updatedAt).format("hh:mm a")}
                data={data}
                cursor="pointer"
              />
            </Box>
          );
        })
      )}
    </Box>
  );
};
