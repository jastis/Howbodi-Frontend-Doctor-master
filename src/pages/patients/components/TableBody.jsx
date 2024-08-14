import React from "react";
import { Text, Tr, Td, Avatar, HStack, Box } from "@chakra-ui/react";
import dayjs from "dayjs";
// import { BiDotsHorizontalRounded } from "react-icons/bi";

export const TableBody = ({ getData }) => {
  return (
    <>
      {/* {getData?.map((data) => {
        return ( */}
      {getData.map((patient, i) => {
        const user = patient?.patientId || patient;
        return (
          <Tr
            // key={nanoid()}
            bg="#fff"
            color="#353535"
            borderBottom="6px solid #efedf3"
            borderRadius="5px"
          >
            <Td>
              <HStack>
                <Avatar
                  size={"sm"}
                  name={`${user?.firstName} ${user?.lastName}`}
                />
                <Box>
                  <Text fontWeight={"bold"} color="#575757" fontSize={"1.2em"}>
                    {user?.firstName} {user?.lastName}{" "}
                  </Text>
                  <Text fontSize={".8em"}> {user?.email} </Text>
                </Box>
              </HStack>
            </Td>
            <Td fontSize={["12px", "14px", "14px"]}>{user?.phoneNumber}</Td>

            <Td py="10px !important">{user?.address}</Td>
            <Td py="10px !important">
              {dayjs(patient?.nextAppointment).format("MMM DD, YYYY")}
            </Td>
            <Td py="10px !important">
              {dayjs(patient?.lastAppointment).format("MMM DD, YYYY")}
            </Td>
          </Tr>
        );
      })}

      {/* );
      })} */}
    </>
  );
};
