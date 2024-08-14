import React, { useState, useEffect } from "react";
import { Box, FormControl, Flex, Text } from "@chakra-ui/react";
import { Button, FormLabel, Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { updateBankDetails } from "../service/updateBankDetails";
// import {getDoctorInfo} from "../service/index"

export const BankAccount = () => {
  const [loading, setLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");

  const doctorId = useSelector((state) => state.auth.docId);
  // const [doctorInfo, setDoctorInfo] = useState({})
  const [disabled, setDisabled] = useState(true);

  // useEffect(() => {
  //   getDoctorInfo(doctorId, setDoctorInfo)
  // }, [doctorId])

  useEffect(() => {
    if (!accountName || !accountNumber || !bankName) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [accountName, accountNumber, bankName]);

  const handleUpdate = () => {
    setLoading(true);
    const payload = {
      doctorId,
      bankName,
      accountNumber,
      accountName,
    };

    updateBankDetails(payload, setLoading)
      .then(() => {
        setBankName("");
        setAccountName("");
        setAccountNumber("");
      })
      .catch(() => {
        return null;
      });
  };

  return (
    <Flex direction={["column", "row"]}>
      <Box mt="20px" flex="1" />
      <Box flex="4">
        <Text fontSize="2em" fontWeight="bold" mb="30px">
          Account Information
        </Text>
        <FormControl>
          <FormLabel>Account Name</FormLabel>
          <Input
            bg="#fff"
            height={"50px"}
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </FormControl>
        <FormControl mt="20px">
          <FormLabel>Account Number</FormLabel>
          <Input
            bg="#fff"
            height="50px"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </FormControl>

        <FormControl mt="20px">
          <FormLabel>Bank Name</FormLabel>
          <Input
            bg="#fff"
            height="50px"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </FormControl>
        <Flex width={"100%"} justifyContent="flex-end">
          <Button
            disabled={disabled}
            my="20px"
            px="40px"
            bg="#5C2BA8"
            _hover={{ bg: "#5C2BA8" }}
            color="#fff"
            onClick={handleUpdate}
            isLoading={loading}
          >
            Update
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
