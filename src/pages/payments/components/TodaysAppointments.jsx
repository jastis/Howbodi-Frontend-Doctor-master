import { Avatar, Box, Button, Divider, Flex, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
// import { AiTwotoneStar } from "react-icons/ai"

export const TodaysAppointments = ({ getData }) => {
  return (
    <Box p="30px 20px" bg="#F6F4F9" borderTopRadius={"20px"}>
      <Text color="#686278" fontSize={"18px"} fontWeight={"semibold"}>
        Today's Appointments
      </Text>
      <Divider />
      {getData?.map((data, i) => {
        return (
          <Flex
            justifyContent={"space-between"}
            my="10px"
            borderBottom={"1px solid #EFEDF3"}
            py="7px"
          >
            <Flex width="70%">
              <Avatar size="sm" src="" name={data?.name} alt="" />
              <Box ml="20px">
                <Tooltip label={data?.name}>
                  <Text
                    color="#686278"
                    fontSize={"12px"}
                    fontWeight="normal"
                    lineHeight={1.2}
                    maxWidth="100px"
                    isTruncated
                  >
                    Dr {data?.name}
                  </Text>
                </Tooltip>
                <Flex
                  width="90px"
                  justifyContent={"space-between"}
                  alignItems="center"
                >
                  <Text fontSize={"12px"}>{data?.frequency}</Text>
                  {/* <AiTwotoneStar color="#09B5A9" />
                    <span>Ratings</span> */}
                </Flex>
              </Box>
            </Flex>
            <Tooltip label={"amount requested"}>
              <Box>
                <Text color="#8C78AB">{data?.time}</Text>
                {/* <Text color="#686278" fontSize={"6px"}>
                    Amount Requested
                  </Text> */}
              </Box>
            </Tooltip>
          </Flex>
        );
      })}
      <Flex justifyContent={"center"} my="30px">
        <Button fontSize={"14px"} color="#fff" borderRadius={"25px"} bg="#C7B8DE">See Calendar</Button>
      </Flex>
    </Box>
  );
}
