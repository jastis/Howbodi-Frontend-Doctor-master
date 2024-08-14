import React, { useCallback, useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { PayInPayOutCards } from "./components/PayInPayOutCards";
import { PaginatedTable } from "../../components/PaginatedTable";
import { Payment } from "./components/Payment";
// import { tableBodyData } from "../doctors/components/tableBodyData";
// import { TodaysAppointments } from "./components/TodaysAppointments";
import { RequestWithdrawal } from "./components/RequestWithdrawal";
import { tableHead } from "./components/tableHead";
import { PieChart } from "../../components/PieChart";
import { getEarnings } from "./services/getEarnings";
import { useSelector } from "react-redux";
import FullPageLoader from "../../components/fullPageLoader";
import {
  getAverageDailyEarning,
  getAverageMonthlyEarning,
  getAverageWeeklyEarning,
} from "./services/getEarningSummary";

export const Payments = () => {
  const [earnings, setEarnings] = useState([]);
  const [totalEranings, setTotalEarning] = useState(0);
  const [averageEarnings, setAverageEarnings] = useState([0, 0, 0]);

  const [loading, setLoading] = useState(true);
  const doctorId = useSelector((state) => state.auth.docId);

  const getEarningAverage = useCallback(() => {
    Promise.allSettled([
      getAverageDailyEarning(doctorId),
      getAverageWeeklyEarning(doctorId),
      getAverageMonthlyEarning(doctorId),
    ]).then((results) => {
      const earningAverage = results.map(
        (resp) => resp?.value?.totalEarnings || 0
      );
      setAverageEarnings([...earningAverage]);
    });
  }, [doctorId]);

  useEffect(() => {
    getEarnings(doctorId, setEarnings, setLoading, setTotalEarning);
    getEarningAverage();
  }, [doctorId, getEarningAverage]);
  return loading ? (
    <FullPageLoader />
  ) : (
    <Box>
      <Flex
        width={"100"}
        justifyContent="space-between"
        direction={["column", "column", "row"]}
      >
        <Box width={["100%", "100%", "58%"]}>
          <PayInPayOutCards />
          <Flex
            justifyContent={"space-between"}
            px={["10px", "10px", "10px"]}
            my="20px"
          >
            <Text mt="20px" fontSize={"22px"} fontWeight="bold" color="#403058">
              Earning History
            </Text>
          </Flex>

          <PaginatedTable
            columns={tableHead}
            bg="#f6f4f9"
            h="460px"
            data={<Payment getData={earnings} />}
            total={totalEranings}
            length={earnings?.length}
            updateTable={(page) =>
              getEarnings(
                doctorId,
                setEarnings,
                setLoading,
                setTotalEarning,
                page
              )
            }
          />
        </Box>
        <Box width={["100%", "100%", "40%"]}>
          <RequestWithdrawal />
          <Flex
            justifyContent="center"
            bg="#f6f4f9"
            borderRadius={"20px"}
            mt="20px"
            p="30px"
          >
            <Box h={"250px"} w={"100%"}>
              <PieChart
                backgroundColor={["#09B5A9", "#8C78AB", "#403058"]}
                plotData={averageEarnings}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
