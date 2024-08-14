import { Box, Flex } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { Card } from "./Card";

import cardBg from "../images/bgImage.svg";
import {
  getEarningSummary,
  getPayoutSummary,
} from "../services/getEarningSummary";
import { useSelector } from "react-redux";

export const PayInPayOutCards = ({ getData, type }) => {
  const [earnings, setEarnings] = useState([]);
  const [payouts, setPayouts] = useState({});
  const [loading, setLoading] = useState(true);
  const doctorId = useSelector((state) => state.auth.docId);

  const handleEarnings = useCallback(
    (month, year = "2022") => {
      getEarningSummary(doctorId, month, year, setEarnings, setLoading);
    },
    [doctorId]
  );

  const handlePayouts = useCallback(
    (month, year = "2022") => {
      getPayoutSummary(doctorId, month, year, setPayouts, setLoading);
    },
    [doctorId]
  );

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      width={"100%"}
      justifyContent="space-between"
      my={["20px", "20px", 0]}
      gap={5}
    >
      <Box width={"100%"} mb={["20px", "20px", 0]}>
        {" "}
        <Card
          bgImg={cardBg}
          bgPosition={"right"}
          bg={"#F6F4F9"}
          loading={loading}
          paymetCaption={"Total Earnings"}
          payment={earnings?.totalEarnings || "0"}
          handleChange={handleEarnings}
        />
      </Box>
      <Box width={"100%"}>
        {" "}
        <Card
          bg={"#F6F4F9"}
          color={"#686278"}
          paymetCaption={"Total Payouts"}
          payment={payouts?.totalPayouts || "0"}
          handleChange={handlePayouts}
        />
      </Box>
    </Flex>
  );
};
