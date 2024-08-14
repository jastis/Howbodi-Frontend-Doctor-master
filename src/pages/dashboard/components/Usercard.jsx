import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import cardBg from "../images/cardBg.svg"

export const UserCard = () => {

  return (
    <Box
      backgroundImage={cardBg}
      borderRadius="10px"
      p="20px 40px"
      boxShadow="base"
    >
      <Flex justifyContent="space-between" direction={"column"} mb="20px">
        <Box mt="40px">
          <Text fontSize="24px" color="#200960" fontWeight="bold">
            Emman Adeyeye
          </Text>
          <Text fontSize="16px" color="#5C2BA8" fontWeight="normal">
            Good Morning
          </Text>
          <Button bg="#5C2BA8" color="#fff" mt="20px" borderRadius={"25px"}>
            Take a test
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
