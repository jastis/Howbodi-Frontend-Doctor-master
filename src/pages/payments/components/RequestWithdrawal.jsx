import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDoctorInfo } from "../../profile/service";
import { PaymentRequestModal } from "./PaymentRequestModal";

export const RequestWithdrawal = () => {
  const doctorId = useSelector((state) => state?.auth?.docId);
  const [doctorInfo, setDoctorInfo] = useState({});

  useEffect(() => {
    getDoctorInfo(doctorId, setDoctorInfo);
  }, [doctorId]);

  return (
    <Box bg="#FFFFFF" borderRadius={"20px"} p="30px" width={"100%"}>
      <Flex
        direction={"column"}
        width="100%"
        justifyContent={"center"}
        alignItems="center"
      >
        <Box width="100%" textAlign={"center"}>
          <Heading
            fontFamily={"Gilroy-Bold"}
            color={"#403058"}
            fontSize="3em"
            fontWeight="bold"
          >
            &#8358; {doctorInfo?.wallet?.balance?.toLocaleString() || 0}
          </Heading>
          <Text color="#9E8FB5" fontSize=".8em">
            Unpaid earnings
          </Text>
        </Box>
        <Divider my="20px" />
        <Box textAlign={"center"} color="#929292">
          <Text fontSize=".8em" maxWidth={"200px"}>
            Updated approximately every 10 minutes
          </Text>
        </Box>

        <PaymentRequestModal doctorInfo={doctorInfo} />
      </Flex>
    </Box>
  );
};
