import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getDoctorInfo } from "../service";

export const SecondRow = ({
  loading,
  handleUpdate,
  getBio,
  getEmail,
  getPhoneNumber,
  setBio,
  setEmail,
  setPhoneNumber,
}) => {
  const [doctorInfo, setDoctorInfo] = useState({});
  const { email, bio, phoneNumber } = doctorInfo || {};

  const doctorId = useSelector((state) => state.auth.docId);

  useEffect(() => {
    if (typeof doctorInfo !== "object") return;
    if (Object?.keys(doctorInfo).length < 1) return;
    setEmail(email);
    setBio(bio);
    setPhoneNumber(phoneNumber);
  }, [setEmail, setBio, bio, email, phoneNumber, doctorInfo, setPhoneNumber]);

  useEffect(() => {
    getDoctorInfo(doctorId, setDoctorInfo);
  }, [doctorId]);

  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Box mt="20px" flex="1" />
        <Box flex="4">
          <Stack direction={["column", "column", "row"]}>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                bg="#fff"
                height={"50px"}
                value={getEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                bg="#fff"
                height="50px"
                value={getPhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>
          </Stack>
          <FormControl mt="20px">
            <FormLabel>Bio</FormLabel>
            <Textarea
              bg="#fff"
              height={"120px"}
              value={getBio}
              onChange={(e) => setBio(e.target.value)}
            />
          </FormControl>
          <Flex width={"100%"} justifyContent="flex-end">
            <Button
              my="20px"
              px="40px"
              _hover={{ background: "#5C2BA8" }}
              bg="#5C2BA8"
              color="#fff"
              onClick={handleUpdate}
              isLoading={loading}
            >
              Update
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
