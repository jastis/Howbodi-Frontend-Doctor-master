import { Avatar, Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { AiTwotoneStar } from "react-icons/ai";

export const TopDoctorCard = ({ getData }) => {
  return (
    <Box bg="#F6F4F9" borderTopRadius={"20px"}  height={"210px"}>
      <Text color="#686278" fontSize={"18px"} fontWeight={"semibold"}>
        Top Doctors
      </Text>
      {/* <Divider /> */}
      {getData?.map((data, i) => {
        return (
          <Flex
            justifyContent={"space-between"}
            my="10px"
            borderBottom={"1px solid #EFEDF3"}
            py="7px"
          >
            <Flex width="100%">
              <Avatar size="sm" src="" name={data?.name} alt="" />
              <Box ml="20px">
                <Tooltip label={data?.name}>
                  <Text
                    color="#686278"
                    fontSize={"14px"}
                    fontWeight="normal"
                    lineHeight={1.2}
                    isTruncated
                    maxWidth={"100%"}
                  >
                    Dr {data?.name}
                  </Text>
                </Tooltip>
                <Flex
                  width="90px"
                  justifyContent={"space-between"}
                  alignItems="center"
                  fontSize={"12px"}
                >
                  <Text>5.5</Text>
                  <AiTwotoneStar color="#09B5A9" />
                  <span>Ratings</span>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        );
      })}
    </Box>
  );
};
