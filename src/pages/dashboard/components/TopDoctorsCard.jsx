import {  Box, Divider, Select, Text } from '@chakra-ui/react'
import React from 'react'
// import { PayoutRequests } from '../../payments/components/TodaysAppointments';
import { TopDoctorCard } from './TopDoctorCard';

export const TopDoctorsCard = ({ getData }) => {
  return (
    <Box borderRadius={"10px"} p="30px" bg={"#F6F4F9"}>
      <Box textAlign={"left"}>
        <Select
          color={"#C8B6E2"}
          placeholder="Please select"
          width="100%"
          // border={"none"}
        >
          <option>Last week</option>
          <option>Last month</option>
        </Select>
      </Box>
      <Box mt="30px">
        <Text color={"#403058"} fontSize={"36px"} fontWeight="semibold">
          28
        </Text>
        <Text color={"#C8B6E2"}>Doctors</Text>
      </Box>
      <Divider />
      <Box mt="20px">
        <TopDoctorCard getData={getData.slice(0, 2)} />
        {/* <Text>Top Doctors</Text>
        <Avatar size="sm" name="" alt="" src="" /> */}
      </Box>
    </Box>
  );
}
