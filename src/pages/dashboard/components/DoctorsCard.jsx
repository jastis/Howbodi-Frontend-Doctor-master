import { Box, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { BsCalendar2Minus } from "react-icons/bs";
import { AiFillBell } from "react-icons/ai";
import drJoan from "../images/joanImg.svg";
import dayjs from "dayjs";
import { useMediaQuery } from "@chakra-ui/react";

export const DoctorsCard = ({ user, total }) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  return (
    <Box borderRadius={"10px"} width="100%" bg="#F6F4F9" p="20px 30px">
      <Box position="relative">
        <Flex
          alignItems={"center"}
          bg="#fff"
          p="5px"
          borderRadius={"5px"}
          width="170px"
          color="grey"
          border="1px solid #EEE4FE"
          px={"10px"}
        >
          <Box>
            <BsCalendar2Minus />
          </Box>
          <Divider
            orientation="vertical"
            height="27px !important"
            color="grey"
            mx="10px"
          />
          <Text>{dayjs().format("DD MMMM YYYY")}</Text>
        </Flex>
        <Box mt="20px" w="200px" maxW="200px">
          <Text color="#5C2BA8">Hello, </Text>
          <Heading
            fontFamily="Gilroy-Bold"
            fontSize={["30px", "30px", "46px"]}
            color="#403058"
            lineHeight={1}
          >
            {user?.name}
          </Heading>
        </Box>
        <Flex mt="20px" alignItems={"center"}>
          <AiFillBell color="#9E8FB5" size="20px" />
          <Text ml="10px" fontSize={".8em"}>
            <span style={{ color: "#09B5A9" }}>{total} Patients</span> remaining
            today
          </Text>
        </Flex>
        <Box>
          <Image
            style={{
              width: isLargerThan1280 ? "630px " : "730px",
              position: "absolute",
              bottom: "5px",
              right: "0px",
              zIndex: "888",
              transform: "scale(1.2)",
            }}
            src={drJoan}
            alt=""
          />
        </Box>
      </Box>
    </Box>
  );
};
