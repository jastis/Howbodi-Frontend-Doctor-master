import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BOOKING_END_MINUTE } from "../../../app/constants";
import { reschedulePatientBooking } from "../services";
import { CalendarDatePicker } from "./CalendarDatePicker";

const Reschedule = ({ onClose, handleChange, date, bookingId, refresh }) => {
  const [loading, setLoading] = useState(false);
  const doctorId = useSelector((state) => state.auth.docId);
  const [disabled, setDisabled] = useState(true);

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
    disabled,
    isLoading: loading,
  };
  const BTN_PROPS_1 = {
    variant: "outline",
    borderColor: "#5C2BA8",
    color: "#5C2BA8",
    disabled,
  };
  const [selectedDate, setSelectedDate] = useState("");
  const [rescheduleStartTime, setRescheduleStartTime] = useState("");

  const handleDateClick = (date) => {
    if (!date) return;

    const reformattedDate = dayjs()
      .date(Number(date?.day))
      .month(Number(date?.month) - 1)
      .year(date?.year)
      .format();

    setSelectedDate(reformattedDate);
  };
  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h?.split(" ") || [];

    let [hours, minutes] = time?.split(":") || [];

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  const reschedulePatient = () => {
    const year = dayjs(selectedDate)?.get("year");
    const month = dayjs(selectedDate)?.get("month");
    const date = dayjs(selectedDate)?.get("date");

    const convertedTime = convertTime12to24(rescheduleStartTime);
    const splitTime = convertedTime?.split(":");
    const hour = splitTime?.[0];
    const minute = splitTime?.[1];

    const startDate = dayjs()
      .year?.(year)
      .month?.(month)
      .date?.(date)
      .hour?.(hour)
      .minute?.(minute)
      .format();

    const endDate = dayjs()
      .year?.(year)
      .month?.(month)
      .date?.(date)
      .hour?.(hour)
      .minute?.(minute)
      .add?.(BOOKING_END_MINUTE, "minute")
      .format(); //x minutes add to it, as the end time

    setLoading(true);
    const payload = {
      startDate,
      endDate,
      doctorId,
      refresh,
      onClose,
      bookingId,
      setLoading,
    };

    reschedulePatientBooking(payload);
  };

  useEffect(() => {
    if (!selectedDate || !rescheduleStartTime) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [rescheduleStartTime, selectedDate]);

  return (
    <Flex width="100%">
      <Flex direction="column" minWidth="55%" bg="white">
        <Text fontSize="sm" color="#757575" textAlign="left" mb="4">
          Reschedule a patient
        </Text>

        <Flex justifyContent="center">
          <CalendarDatePicker setDate={(date) => handleDateClick(date)} />
        </Flex>
      </Flex>
      <Flex {...FLEX_PROPS}>
        <Box>
          <Input
            w={"100px"}
            size="xs"
            type="time"
            onChange={(e) => setRescheduleStartTime(e.target.value)}
            value={rescheduleStartTime}
          />
        </Box>
        <Stack>
          <Button {...BTN_PROPS} onClick={reschedulePatient}>
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

export default Reschedule;
