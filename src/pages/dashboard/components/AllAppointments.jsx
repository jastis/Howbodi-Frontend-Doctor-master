import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
// import { AiTwotoneStar } from "react-icons/ai"
import { Link } from "react-router-dom";

export const AllAppointments = ({ getData }) => {
  return (
    <Box
      p="30px 20px"
      bg="#F6F4F9"
      borderTopRadius={"20px"}
      maxHeight="300px"
      overflowY={"scroll"}
    >
      <Text color="#403058" fontSize={"18px"} fontWeight={"semibold"}>
        Appointments
      </Text>
      <Divider />
      {getData.length ? (
        getData?.map((data, i) => {
          const patient = data?.patientId;
          return (
            <Flex
              justifyContent={"space-between"}
              my="10px"
              borderBottom={"1px solid #EFEDF3"}
              py="7px"
            >
              <Flex>
                <Avatar
                  size="sm"
                  src={patient?.image}
                  name={`${patient?.firstName}, ${patient?.lastName}`}
                  alt=""
                />
                <Box ml="20px">
                  <Tooltip
                    label={`${patient?.firstName}, ${patient?.lastName}`}
                  >
                    <Text
                      color="#403058"
                      fontSize={"1em"}
                      fontWeight="bold"
                      lineHeight={1.2}
                      // maxWidth="100px"
                      isTruncated
                    >
                      {`${patient?.firstName} ${patient?.lastName}`}
                    </Text>
                  </Tooltip>

                  <Flex
                    width="90px"
                    justifyContent={"space-between"}
                    alignItems="center"
                  >
                    <Text color="#8C78AB" fontSize={".8em"}>
                      {dayjs(data?.startDate).format("D MMMM YYYY")}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
              {/* <Text
                color="#686278"
                fontSize={"12px"}
                fontWeight="normal"
                lineHeight={1.2}
                maxWidth="100px"
                isTruncated
              >
                {data?.visitationType || "No Visitation Type"}
              </Text> */}
              <Tooltip label={"amount requested"}>
                <Box>
                  <Text color="#8C78AB" fontSize={".8em"}>
                    {dayjs(data?.startDate).format("hh:mm A")}
                  </Text>
                </Box>
              </Tooltip>
            </Flex>
          );
        })
      ) : (
        <Text mt={5}> No Appointments </Text>
      )}
      <Flex justifyContent={"center"} my="30px">
        <Link to="/calendar">
          <Button
            border="1px solid #C7B8DE"
            fontSize={"14px"}
            color="#403058"
            borderRadius={"25px"}
            bg="#EEE4FE"
            _hover={{ bg: "#EEE4FE" }}
          >
            See Calendar
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};
