import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const ConsultationCard = ({ patientsCase, visitationType, date, key }) => {
  return (
    <Box bg="#fff" color="#929292" p="10px" borderRadius="10px">
      <Flex width={"100%"} justifyContent="space-between">
        <Box>
          <Text fontSize={"12px"}>{patientsCase}</Text>
          <Text fontSize={"14px"}>{visitationType}</Text>
        </Box>
        <Box>
          <Text fontSize={"14px"}>{date}</Text>
        </Box>
      </Flex>
    </Box>
  );
}
