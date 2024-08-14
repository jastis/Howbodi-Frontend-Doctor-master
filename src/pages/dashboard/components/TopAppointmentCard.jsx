import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { ConsultationCard } from './ConsultationCard';

export const TopAppointmentCard = ({ getData }) => {
  return (
    <Box
      width={"100%"}
      maxHeight={"300px"}
      borderRadius={"10px"}
      p="30px"
      bg="#F6F4F9"
      overflowY={"scroll"}
    >
      <Text>Appointments</Text>
      <Flex mt="20px" width={"100%"}>
       
        <Box width={"100%"}>
          {getData?.map((data, i) => {
            return (
              <Box key={i} mb="10px">
                <ConsultationCard
                  visitationType={data?.visitationType}
                  patientsCase={data?.testTaken}
                  date={data?.dateCreated}
                />
              </Box>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
}
