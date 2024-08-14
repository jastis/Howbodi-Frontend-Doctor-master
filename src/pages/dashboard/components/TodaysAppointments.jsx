import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { VisitationDetails } from "./VisitationDetails";
import dayjs from "dayjs";

export const TodaysAppointments = ({ getData }) => {
  return (
    <Box p="30px 20px" bg="#F6F4F9" borderRadius={"20px"}>
      <Text color="#403058" fontSize={"18px"} fontWeight={"semibold"}>
        Today's Appointments
      </Text>
      <Divider />
      {getData.length ? (
        getData?.map((data, i) => {
          const patient = data?.patientId?.[0];
          return (
            <VisitationDetails
              name={`${patient?.firstName} ${patient?.lastName}`}
              avatar={patient?.image}
              frequency={data?.frequency}
              time={dayjs(data?.startDate).format("hh:mm a")}
              key={i}
            />
          );
        })
      ) : (
        <Text mt={5}> No Appointment for Today</Text>
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
