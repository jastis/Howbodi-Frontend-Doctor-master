import {  Box, Divider, Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { BsArrowUpLeft } from "react-icons/bs";

export const TopAssessmentCard = ({ getData }) => {
  return (
    <Box p="30px 20px" bg="#F6F4F9" borderTopRadius={"20px"} height="300px">
      <Text color="#686278" fontSize={"18px"} fontWeight={"semibold"} mb="10px">
        Top Assessment
      </Text>
      <Divider />
      {getData?.map((data, i) => {
        return (
          <Flex
            key={i}
            justifyContent={"space-between"}
            my="10px"
            borderBottom={"1px solid #EFEDF3"}
            // py="7px"
          >
            <Flex width="70%">
              <Box ml="20px">
                <Tooltip label={data?.testTaken}>
                  <Text
                    color="#929292"
                    fontSize={"12px"}
                    fontWeight="semibold"
                    lineHeight={1.0}
                    maxWidth="100px"
                    isTruncated
                  >
                    {i + 1}
                    {". "}
                    {data?.testTaken}
                  </Text>
                </Tooltip>
              </Box>
            </Flex>
            <Tooltip label={""}>
              <Flex>
                <Text color="#8C78AB">{data?.branches}</Text>
                <Box ml="10px">
                  <BsArrowUpLeft color="green" />
                </Box>
              </Flex>
            </Tooltip>
          </Flex>
        );
      })}
    </Box>
  );
};
