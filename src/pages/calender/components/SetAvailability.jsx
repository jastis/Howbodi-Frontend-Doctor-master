import { Flex, Box, Button, Text, Stack, Input } from "@chakra-ui/react";
import { BsDash } from "react-icons/bs";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { setAvailability } from "../services/setAvailability";
import { CalendarDatePicker } from "./CalendarDatePicker";
import { getDoctorInfo } from "../../profile/service";

export const TimeActionsRow = ({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
}) => {
  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        sx={{ "& > input": { height: "2rem" } }}
      >
        <Box my="10px">
          <Text fontSize="sm" color="#5C2BA8">
            Choose time
          </Text>
        </Box>
        <Stack spacing="10px" direction="row" alignItems="center">
          <Box>
            <Input
              size="xs"
              type="time"
              onChange={(e) => setStartTime(e.target.value)}
              value={!!startTime ? startTime : ""}
            />
          </Box>
          <BsDash size="1em" />
          <Box>
            <Input
              size="xs"
              type="time"
              onChange={(e) => setEndTime(e.target.value)}
              value={!!endTime ? endTime : ""}
            />
          </Box>
        </Stack>
      </Flex>
      <Stack
        fontWeight="bold"
        direction="row"
        alignItems="center"
        justifyContent="center"
      ></Stack>
    </>
  );
};
const SetAvailability = ({ onClose, handleChange, refresh }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [meetingInterval, setMeetingInterval] = useState("");
  const [loading, setLoading] = useState(false);
  const doctorId = useSelector((state) => state.auth.docId);
  const [doctorInfo, setDoctorInfo] = useState({});

  const [selectedDates, setSelectedDates] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [initialAvailability, setInitialAvailability] = useState([]);

  useEffect(() => {
    if (selectedDates?.length < 1 || !startTime || !endTime) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [selectedDates, startTime, endTime]);

  useEffect(() => {
    getDoctorInfo(doctorId, setDoctorInfo);
  }, [doctorId]);

  useEffect(() => {
    const availableDates = doctorInfo?.availability;
    if (!availableDates) return;
    if (!Array?.isArray(availableDates)) return;
    //remove date that has past, to stop error comiing from the calendar package
    const filteredOutPastDates = availableDates?.filter(
      (date) => new Date(date?.startDate) >= new Date().setHours(0, 0, 0, 0) //to only compare dates, not time
    );

    const formattedDates = filteredOutPastDates?.map((date) => ({
      year: Number(dayjs(date?.startDate).format("YYYY")),
      month: Number(dayjs(date?.startDate).format("M")),
      day: Number(dayjs(date?.startDate).format("D")),
    }));

    setInitialAvailability(formattedDates);
  }, [doctorInfo]);

  const handleDateClick = (date) => {
    if (!date) return;
    if (date?.length < 1) return;

    const reformattedDate = date.map((data) => {
      return dayjs()
        .date(Number(data?.day))
        .month(Number(data?.month) - 1)
        .year(data?.year)
        .format();
    });

    setSelectedDates(reformattedDate);
  };

  const TIME_ACTIONS_ROW_PROPS = {
    startTime,
    endTime,
    meetingInterval,
    setStartTime,
    setEndTime,
    setMeetingInterval,
  };

  const FLEX_PROPS = {
    direction: "column",
    minWidth: "45%",
    bg: "#F5F8FF",
    p: 4,
    justifyContent: "space-between",
  };

  const BTN_PROPS = {
    bg: "#5C2BA8",
    _hover: { bg: "#5C2BA8" },
    color: "white",
    mb: 2,
    // onClick: handleApply,
    // disabled: disabled,
    isLoading: loading,
  };
  const BTN_PROPS_1 = {
    variant: "outline",
    borderColor: "#5C2BA8",
    color: "#5C2BA8",
  };

  const handleAvailability = () => {
    setLoading(true);

    const payload = {
      doctorId,
      dates: selectedDates,
      time: startTime + "-" + endTime,
    };

    setAvailability(payload, onClose, setLoading, refresh);
  };

  return (
    <Flex width="100%">
      <Flex direction="column" minWidth="55%" bg="white">
        <Text fontSize="sm" color="#757575" textAlign="left" mb="4">
          Set up your availability
        </Text>
        <Text
          fontSize=".7em"
          color="#d73737"
          borderRadius="5px"
          padding="5px"
          my="15px"
          fontWeight={"bold"}
        >
          WARNING
          <br />
          Past availability won't be highlighted on these calendar.
        </Text>
        <Flex justifyContent="center">
          <CalendarDatePicker
            initValue={initialAvailability}
            setDate={(date) => {
              handleDateClick(date);
            }}
            type="multi"
          />
        </Flex>
      </Flex>
      <Flex {...FLEX_PROPS}>
        <TimeActionsRow {...TIME_ACTIONS_ROW_PROPS} />
        <Stack>
          <Button
            {...BTN_PROPS}
            onClick={handleAvailability}
            disabled={disabled}
          >
            Apply
          </Button>
          <Button {...BTN_PROPS_1} onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default SetAvailability;
