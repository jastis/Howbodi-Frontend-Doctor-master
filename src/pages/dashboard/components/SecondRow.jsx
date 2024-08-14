import { Box, Circle, Flex, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { AllAppointments } from "./AllAppointments";
import CustomCalendar from "./Calendar";
import { getDate } from "date-fns";
import dayjs from "dayjs";
import {
  getDoctorSchedules,
  getSchedules,
} from "../../calender/services/getSchedules";
import { useSelector } from "react-redux";
import ListScheduleDetailsModal from "../../calender/components/ListScheduleDetailsModal";

export const SecondRow = ({ user }) => {
  const doctorId = useSelector((state) => state.auth.docId);
  const [appointment, setAppointment] = useState({});

  const [getAllDateScheduleLoader, setGetAllDateScheduleLoader] =
    useState(false);
  const [showAllDateScheduleModal, setShowAllDateScheduleModal] =
    useState(false);
  const [allDateScheduleResult, setAllDateScheduleResult] = useState([]);

  //get all schedules with the time parameter
  const getAllDateSchedule = (res) => {
    if (!res) return;
    setShowAllDateScheduleModal(true);
    setGetAllDateScheduleLoader(true);
    const formatDate = dayjs(res).format("YYYY-MM-DD");
    getSchedules(doctorId, formatDate)
      .then((result) => {
        setAllDateScheduleResult(result);
        setGetAllDateScheduleLoader(false);
      })
      .catch((err) => {
        setGetAllDateScheduleLoader(false);
      });
  };
  const customRender = (date) => {
    const newDate = user?.availability?.some(
      (selectedDate) =>
        dayjs(date).format("DD-MM-YYYY") ===
        dayjs(selectedDate?.startDate).format("DD-MM-YYYY")
    );

    return newDate ? (
      <Circle bg="#8c78ab" color="#fff" size="4ch" p={2}>
        {getDate(date)}
      </Circle>
    ) : (
      <span>{getDate(date)}</span>
    );
  };

  const getAppointment = useCallback(() => {
    const filter = { doctorId, status: "APPROVED" };
    getDoctorSchedules(filter)
      .then((data) => {
        if (typeof data === "object") {
          setAppointment({ ...data });
        }
      })
      .catch((e) => {
        return null;
      });
  }, [doctorId]);

  useEffect(() => {
    getAppointment();
  }, [getAppointment]);

  const overrideStyle = `
    .rdrCalendarWrapper {
    background: #F6F4F9 !important; 

}
.rdrDayToday .rdrDayNumber span:after {
    content: '';
    position: ;
    bottom: 4px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 18px;
    height: 2px;
    border-radius: 2px;
    background: transparent !important;
}

.css-18llujw .rdrDayToday .rdrDayNumber span {
    color: #000;
    font-weight: bold;
}
`;

  return (
    <Box mb="40px">
      <Flex
        width="100%"
        direction={["column", "column", "row"]}
        justifyContent={"space-between"}
      >
        <Box width={["100%", "100%", "65%"]}>
          <Flex width={["100%"]} justifyContent="space-between">
            <Box width={"100%"}>
              <AllAppointments getData={appointment?.schedules || []} />
            </Box>
          </Flex>
        </Box>
        <Box
          width={["100%", "100%", "33%"]}
          mt={["20px", "20px", 0]}
          background="#F6F4F9"
          borderRadius=" 15px"
          padding=" 10px"
        >
          <Text color="#403058" fontSize={"18px"} fontWeight={"semibold"}>
            Calendar
          </Text>
          <style>{overrideStyle}</style>
          <CustomCalendar
            textAlign="center"
            monthPadding="0"
            fontWeight="600"
            handleChange={(res) => getAllDateSchedule(res)}
            customRender={customRender}
          />
          <ListScheduleDetailsModal
            showAllDateScheduleModal={showAllDateScheduleModal}
            setShowAllDateScheduleModal={setShowAllDateScheduleModal}
            getAllDateScheduleLoader={getAllDateScheduleLoader}
            allDateScheduleResult={allDateScheduleResult}
          />
        </Box>
      </Flex>
    </Box>
  );
};
