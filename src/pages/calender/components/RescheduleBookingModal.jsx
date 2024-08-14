import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
// import { getScheduleDates } from "../../doctors/services";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { BOOKING_END_MINUTE } from "../../../app/constants";
import FullPageLoader from "../../../components/fullPageLoader";
import { getScheduleDates, reschedulePatientBooking } from "../services";
import ConfirmBookingModal from "./ConfirmBookingModal";

var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

function RescheduleBooking({
  buttonProps,
  buttonTitle,
  isOpen,
  onClose,
  availability,
  doctorId,
  refresh,
  bookingId,
}) {
  const [loading, setLoading] = useState(false);
  const [availableDays, setAvailableDays] = useState([]);
  const [showTime, setShowTime] = useState(false);
  const [styleId, setStyleId] = useState(null);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [daySelected, setDaySelected] = useState(null);
  const [choosenTime, setChoosenTime] = useState(null);
  const [scheduledDates, setScheduledDates] = useState([]);
  const [scheduledDatesLoader, setScheduledDatesLoader] = useState(false);

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

  //change availability format and store to available days
  useEffect(() => {
    const dates = availability?.map((date) => new Date(date?.startDate));
    setAvailableDays(dates);
  }, [availability]);

  const isDayDisabled = (day) => {
    const newDay = availableDays.filter(
      (availableDay) => availableDay >= new Date().setHours(0, 0, 0, 0)
    );
    return !newDay?.some((availabledDay) =>
      DateUtils?.isSameDay(day, availabledDay)
    );
  };

  const reschedulePatient = () => {
    setLoading(true);
    const year = dayjs(daySelected)?.get("year");
    const month = dayjs(daySelected)?.get("month");
    const date = dayjs(daySelected)?.get("date");

    const convertedTime = convertTime12to24(choosenTime);
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
      .format(); //50 minutes add to it, as the end time

    const payload = {
      doctorId,
      startDate,
      endDate,
      onClose,
      bookingId,
      setLoading,
      refresh,
    };
    reschedulePatientBooking(payload);
  };

  //the last parameter, make sure users dont select time that is less than the specified datetime
  const getTimes = (start, end, step = "30", date) => {
    if (!date) return [];
    const selectedDay = dayjs(date).format("YYYY-MM-DD");
    const today = dayjs().format("YYYY-MM-DD");
    let dt = new Date(`December 17, 1995 ${start}`);
    let dc = new Date(`December 17, 1995 ${end}`);

    if (selectedDay > today) {
      let rc = [];
      while (dt <= dc) {
        let availability =
          dt.toLocaleTimeString("en-US", { timeStyle: "short" }) +
          " - " +
          new Date(
            dt.setMinutes(dt.getMinutes() + Number(step))
          ).toLocaleTimeString("en-US", { timeStyle: "short" });
        let splitAvailability = availability.split("-");
        let startAvailability = splitAvailability[0];
        rc.push(startAvailability);
      }
      return rc;
    } else {
      const nowTime = dayjs().format("HH:mm");
      let ft = [];

      if (dayjs(dc).format("HH:mm") > nowTime) {
        while (dt <= dc) {
          if (dayjs(dt).format("HH:mm") > nowTime) {
            let availability =
              dt.toLocaleTimeString("en-US", { timeStyle: "short" }) +
              " - " +
              new Date(
                dt.setMinutes(dt.getMinutes() + Number(step))
              ).toLocaleTimeString("en-US", { timeStyle: "short" });
            let splitAvailability = availability.split("-");
            let startAvailability = splitAvailability[0];
            ft.push(startAvailability);
          } else {
            dt.setMinutes(dt.getMinutes() + Number(step));
          }
        }
        return ft;
      } else {
        return [];
      }
    }
  };

  //check if they have selected both day and choosenTime
  useEffect(() => {
    if (choosenTime && daySelected) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [choosenTime, daySelected]);

  const selectCalendarDay = (res) => {
    const selectedDateObject = availability.find(
      (date) =>
        dayjs(date.startDate).format("DD/MM/YYYY") ===
        dayjs(res).format("DD/MM/YYYY")
    );

    const getStartTime = dayjs
      .utc(selectedDateObject?.startDate)
      .format("HH:mm");
    const getEndTime = dayjs.utc(selectedDateObject?.endDate).format("HH:mm");

    setStartTime(getStartTime);
    setEndTime(getEndTime);
    setShowTime(true);
  };

  const overrideDayPicker = `
  .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background-color: #6027B2;
}

  .DayPicker-Day {
background: #6027B2;
color: #fff;
    background #6027B2;
    border
    color: #000;
    padding: 10px 15px;
    font-weight: bold;
   
}

.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
     background-color: #6027B2;
    color: #fff;
   ;
}
.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background-color: #6027B2;
}
.DayPicker-Day--disabled {
   pointer-events: none;
   color: #DCE0E0;
    font-weight: normal;
    background: none;
 
}
.DayPicker-Caption > div {
    color: #6027B2;
}
  `;

  const scheduledDatesArray = () =>
    scheduledDates?.map((date) => dayjs(date).format("h:mm A"));

  const filterOutBookedDates = () => {
    return getTimes(
      startTime,
      endTime,
      BOOKING_END_MINUTE,
      daySelected
    )?.filter((time) => !scheduledDatesArray()?.includes(time?.trim()));
  };

  return (
    <Box>
      <Button {...buttonProps}>{buttonTitle}</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setDisabled(true);
          setDaySelected(null);
          setShowTime(false);
        }}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalCloseButton _focus={{ boxShadow: "none" }} />
            <style>{overrideDayPicker}</style>
            <Stack direction="row" alignItems={"center"}>
              <DayPicker
                selectedDays={daySelected}
                onDayClick={(res) => {
                  selectCalendarDay(res);
                  setDaySelected(res);
                  setChoosenTime(null);
                  setStyleId(null);
                  setScheduledDatesLoader(true);
                  getScheduleDates(
                    setScheduledDates,
                    doctorId,
                    dayjs(res).format("YYYY-MM-DD"),
                    setScheduledDatesLoader
                  );
                }}
                disabledDays={isDayDisabled}
              />
              {scheduledDatesLoader ? (
                <FullPageLoader h="100%" bg="transparent" />
              ) : (
                <Stack spacing={"20px"}>
                  <Stack
                    direction="column"
                    align="center"
                    maxHeight="240px"
                    overflow="auto"
                  >
                    <SimpleGrid columns={2} spacing={2}>
                      {showTime ? (
                        filterOutBookedDates()?.map?.((time, i) => {
                          return (
                            <Text
                              cursor="pointer"
                              textAlign={"center"}
                              p="5px"
                              fontSize={".8em"}
                              borderRadius="10px"
                              key={i}
                              width={"100%"}
                              bg={styleId === i ? "#403058" : "#fff"}
                              color={styleId === i ? "#fff" : "#403058"}
                              border="1px solid #CAF0F8"
                              fontWeight={"normal"}
                              onClick={() => {
                                setStyleId(i);
                                setChoosenTime(time);
                              }}
                            >
                              {time}
                            </Text>
                          );
                        })
                      ) : (
                        <Text>No day selected</Text>
                      )}
                    </SimpleGrid>
                  </Stack>
                  {!disabled && (
                    <ConfirmBookingModal
                      type="RESCHEDULE"
                      buttonTitle="Reschedule"
                      handleBook={() => reschedulePatient()}
                      disabled={disabled}
                      loading={loading}
                    />
                  )}
                </Stack>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default RescheduleBooking;
