import { Box, Divider, Flex, Select, Text } from "@chakra-ui/react";
import React from "react";
// import { AiOutlinePlus } from "react-icons/ai";
import { ImDownload } from "react-icons/im";
import { HiOutlineDownload } from "react-icons/hi";
import { AddDoctorsModal } from "./AddDoctorsModal";

export const TestRow = () => {
  return (
    <Box bg="inherit">
      <Divider />
      <Flex
        direction={["column", "column", "row"]}
        justifyContent={"space-between"}
        alignItems="center"
        my="20px"
        width="100%"
      >
        <Flex
          width={["100%", "100%", "40%"]}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Flex
            direction={["column", "row"]}
            width={["30%", "30%", "40%"]}
            justifyContent={["flex-start", "space-between"]}
            alignItems="center"
            color="#BBBBBB"
          >
            <Text color="#9E8FB5" fontSize={"36px"} fontWeight={"bold"}>
              36
            </Text>
            <Text>Therapists</Text>
            <Divider orientation="vertical" />
          </Flex>
          <Text color="#BBBBBB">Sort By:</Text>
          <Select
            placeholder="Last appointment"
            bg="#fff"
            color="#BBBBBB"
            width={"180px"}
          >
            <option>Last Month</option>
            <option>Last Week</option>
          </Select>
        </Flex>
        <Flex justifyContent={"space-between"} width={["100%", "100%", "35%"]}>
          <Flex
            justifyContent={"center"}
            alignItems="center"
            bg="#fff"
            p={["3px 8px", "5px 15px"]}
            mr="2px"
            cursor={"pointer"}
          >
            <HiOutlineDownload />
            <Text ml="8px" color="#403058">
              CSV
            </Text>
          </Flex>
          <Flex
            justifyContent={"center"}
            alignItems="center"
            bg="#fff"
            p="5px 15px"
            mr="4px"
            cursor={"pointer"}
          >
            <ImDownload />
            <Text ml="8px" color="#403058">
              PDF
            </Text>
          </Flex>
          <AddDoctorsModal />
        </Flex>
      </Flex>
      <Divider />
    </Box>
  );
};
