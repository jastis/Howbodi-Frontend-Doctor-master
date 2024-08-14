import { Box, Flex } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { PaginatedTable } from "../../../components/PaginatedTable";
import { Card } from "../../payments/components/Card";
import { TodaysAppointments } from "./TodaysAppointments";

import cardBg from "../images/cardBgs.svg";
import { DoctorsCard } from "./DoctorsCard";
import { PatientsCard } from "./PatientsCard";
import { useSelector } from "react-redux";
import { getEarningSummary } from "../../payments/services/getEarningSummary";
import { getDoctorSchedules } from "../../calender/services/getSchedules";
import dayjs from "dayjs";
import { getTotalPatients } from "../service/totalPatients";
import { getTotalSchedules } from "../service";

export const FirstRow = ({ user }) => {
  const [earnings, setEarnings] = useState([]);
  const [patientTotal, setPatientTotal] = useState(0);
  const [todayAppointment, setTodayAppointment] = useState({});
  const [loading, setLoading] = useState(true);
  const doctorId = useSelector((state) => state.auth.docId);
  const [totalSchedules, setTotalSchedules] = useState(0);

  const handleEarnings = useCallback(
    (month, year = dayjs().format("YYYY")) => {
      getEarningSummary(doctorId, month, year, setEarnings, setLoading);
    },
    [doctorId]
  );
  const getPatientTotal = useCallback(() => {
    getTotalPatients(doctorId, setPatientTotal);
  }, [doctorId]);

  const getTodayAppointment = useCallback(() => {
    const date = new Date()?.toJSON()?.split?.("T")?.[0];
    const filter = { doctorId, date, status: "APPROVED" };
    getDoctorSchedules(filter)
      .then((data) => {
        setTodayAppointment({ ...data });
      })
      .catch((e) => {
        return null;
      });
  }, [doctorId]);

  useEffect(() => {
    getTotalSchedules(doctorId, setTotalSchedules);
  }, [doctorId]);

  useEffect(() => {
    getPatientTotal();
    getTodayAppointment();
  }, [getPatientTotal, getTodayAppointment]);

  return (
    // <Box>
    <Flex
      width="100%"
      justifyContent={"space-between"}
      direction={["column", "column", "row"]}
      h="100%"
    >
      <Box width={["100%", "100%", "65%"]} mb="20px">
        <Flex width={["100%"]} justifyContent="space-between">
          <DoctorsCard
            user={user}
            total={todayAppointment?.schedules?.length || 0}
          />
        </Flex>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap="20px"
          width={"100%"}
          mt="20px"
          justifyContent={"space-between"}
        >
          <Box width={{ base: "100%", lg: "40%" }}>
            <Card
              bgImg={cardBg}
              bg={"#fff"}
              loading={loading}
              color="#403058"
              paymetCaption={"Total Earning"}
              payment={earnings?.totalEarnings || "0"}
              handleChange={handleEarnings}
            />
          </Box>
          <Box width={{ base: "100%", lg: "60%" }}>
            <PatientsCard
              totalAppointments={totalSchedules}
              totalPatient={patientTotal}
            />
          </Box>
        </Flex>
      </Box>

      <Box width={["100%", "100%", "33%"]} mt="-20px">
        <PaginatedTable
          columns={[]}
          bg="transparent"
          h={"100%"}
          noPagination={true}
          data={
            <TodaysAppointments getData={todayAppointment?.schedules || []} />
          }
        />
      </Box>
    </Flex>
    // </Box>
  );
};
