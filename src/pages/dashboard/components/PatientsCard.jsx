import { Box, Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BsPeople } from "react-icons/bs";
//import { totalPatients } from "../service/totalPatients";
//import { useSelector } from "react-redux";

export const PatientsCard = (props) => {
  return (
    <>
      <Box borderRadius={"10px"} bg="#F6F4F9" p="50px 20px">
        <Flex alignItems={"center"} justifyContent="space-between" width="100%">
          <Stack direction={"row"} alignItems="center">
            <IconButton
              p={2}
              disabled
              bg={"#EEE4FE"}
              cursor="default"
              _disabled={{ bg: "#EEE4FE" }}
              _hover={{ background: "#EEE4FE" }}
              size={"64px"}
              icon={<BsPeople color="#403058" size="30px" />}
            />

            <Box>
              <Heading
                fontSize={"2.5em"}
                fontFamily="Gilroy-Bold"
                color="#403058"
              >
                {" "}
                {props.totalPatient}
              </Heading>
              <Text fontSize=".6em" color="#403058">
                Total Patients
              </Text>
            </Box>
          </Stack>

          <Stack direction={"row"} alignItems="center">
            <IconButton
              p={2}
              disabled
              bg={"#09B5A9"}
              cursor="default"
              _disabled={{ bg: "#09B5A9" }}
              _hover={{ background: "#09B5A9" }}
              size={"4px"}
              icon={<BsPeople color="#fff" size="30px" />}
            />

            <Box>
              <Heading fontFamily="Gilroy-Bold" color="#403058">
                {" "}
                {props?.totalAppointments}
              </Heading>
              <Text fontSize=".7em" color="#403058">
                Total Appointments
              </Text>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};
