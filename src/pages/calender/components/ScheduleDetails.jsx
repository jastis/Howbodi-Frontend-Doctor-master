import { Avatar, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import CustomModal from "../../../components/CustomModal";
import TransferModal from "./TransferModal";
import { updateBookings } from "../services/updateBookings";
import { BsArrowRight } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { initiateChat } from "../services";
import dayjs from "dayjs";
import { errorNotifier } from "../../../components/NotificationHandler";

import { useSelector } from "react-redux";
import RescheduleBooking from "./RescheduleBookingModal";

export const ScheduleDetails = ({
  name,
  status,
  visitationType,
  doctors,
  bookingId,
  schedule,
  refresh,
  scheduledDate,
  scheduleEndDate,
  recallGetScheduleFunction,
  availability,
}) => {
  const [loading, setLoading] = useState(false);
  const [chatLoader, setChatLoader] = useState(false);
  const history = useHistory();
  const { docId } = useSelector((state) => state.auth);
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);

  const handleUpdateStatus = () => {
    setLoading(true);
    const payload = {
      status: "APPROVED",
    };
    updateBookings(bookingId, payload, setLoading).then(() => {
      recallGetScheduleFunction();
    });
  };

  const handleStartChat = () => {
    //make sure the doctor isnt already in a chat with the patient, before initiating another one with same patient
    //(because there will be conflict with the timer)
    // const timerObject = JSON.parse(
    //   sessionStorage.getItem("timerDetailsObject")
    // );
    // if (timerObject && timerObject?.patientIdOfTimer === patientId) {
    //   errorNotifier("A chat with this patient is still ongoing.");
    //   return;
    // }
    // if (timerObject && timerObject?.patientIdOfTimer !== patientId) {
    //   errorNotifier("You already have an ongoing schedule.");
    //   return;
    // }

    setChatLoader(true);
    //let backend know, so they can deduct credit from the patient
    initiateChat(bookingId)
      .then((res) => {
        setChatLoader(false);
        const userId = {
          ...schedule?.patientId?.[0],
        };

        history.push({
          pathname: "/chats",
          state: { user: { userId } },
        });
      })
      .catch((e) => {
        setChatLoader(false);
        errorNotifier(e?.response?.data?.result?.message);
      });
  };

  //checking date and time if it is the scheduled date
  const isScheduledDate = () => {
    if (
      new Date().setHours(0, 0, 0, 0) ===
        new Date(scheduledDate).setHours(0, 0, 0, 0) &&
      dayjs().format("HH:mm") >= dayjs(scheduledDate).format("HH:mm")
    ) {
      return true;
    }
    return false;
  };

  const scheduleDateHasPassed = () => {
    if (
      new Date(scheduleEndDate).setHours(0, 0, 0, 0) >
      new Date().setHours(0, 0, 0, 0)
    ) {
      return false;
    } else if (
      new Date().setHours(0, 0, 0, 0) <
        new Date(scheduleEndDate).setHours(0, 0, 0, 0) ||
      new Date().setHours(0, 0, 0, 0) !==
        new Date(scheduleEndDate).setHours(0, 0, 0, 0) ||
      dayjs().format("HH:mm") > dayjs(scheduleEndDate).format("HH:mm")
    ) {
      return true;
    } else {
      return false;
    }
  };

  // const getSplittedTime = (time) => {
  //   const splitted = getHourAndMinute(time);
  //   const { hour, minute } = splitted || {};
  //   return dayjs()?.hour(hour)?.minute(minute)?.format("h:mm a");
  // };

  // const getSplittedTimeAndAddXMinute = (time) => {
  //   const splitted = getHourAndMinute(time);
  //   const { hour, minute } = splitted || {};
  //   return dayjs()
  //     ?.hour(hour)
  //     ?.minute(minute)
  //     ?.add(BOOKING_END_MINUTE, "minute")
  //     ?.format("h:mm a");
  // };

  return (
    <Box
      bg="#ebe1fc8f"
      p="15px"
      borderRadius={"10px"}
      maxWidth="280px"
      width="100%"
      m="7px"
    >
      <Flex mb="15px" direction={"column"}>
        <Flex>
          <Avatar src={""} name={name} alt={`Picture of ${name}`} />
          <Box ml="20px">
            <Text color="#403058" fontWeight={"semibold"}>
              {name}
            </Text>
            <Text color="#929292" my="3px">
              {visitationType}
            </Text>
            <Flex alignItems={"center"}>
              <BiTimeFive color="#929292" />
              <Text ml="10px" color="#929292" fontSize=".8em" fontWeight="bold">
                {dayjs(scheduledDate).format("hh:mm a")} {"-"}{" "}
                {dayjs(scheduleEndDate).format("hh:mm a")}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      {status === "CANCELLED" ? (
        <p style={{ textAlign: "center" }}>
          Instant booking has been cancelled, due to you not responding on time
        </p>
      ) : (status === "APPROVED" ||
          status === "INITIATED" ||
          status === "PENDING") &&
        scheduleDateHasPassed() ? (
        <p>Your schedule date has elapsed.</p>
      ) : status === "APPROVED" && isScheduledDate() ? (
        <Button
          onClick={() => handleStartChat()}
          isLoading={chatLoader}
          textColor={"#fff"}
          bg="#5C2BA8"
          size="sm"
          _hover={{ bg: "#5C2BA8" }}
        >
          {" "}
          Start Chat
        </Button>
      ) : status === "INITIATED" && isScheduledDate() ? (
        <Box>
          <p>Your chat has already started</p>
          <Stack direction="row" alignItems={"center"}>
            <Text
              fontSize={".8em"}
              cursor="pointer"
              onClick={() => {
                const userId = {
                  ...schedule?.patient?.[0],
                };
                history.push({
                  pathname: "/chats",
                  state: { user: { userId } },
                });
              }}
            >
              Go to chat
            </Text>
            <BsArrowRight />
          </Stack>
        </Box>
      ) : status === "APPROVED" && !isScheduledDate() ? (
        <p>Please wait until scheduled date & time</p>
      ) : (
        <Stack direction={"row"} alignItems="center">
          <CustomModal
            background="transparent"
            color="#5C2BA8"
            border={"1px solid #5C2BA8"}
            btnTitle="Transfer"
            size="sm"
            fontSize=".8em"
            lgModal={false}
            title="Transfer Patient"
          >
            <TransferModal
              allStaff={doctors}
              bookingId={bookingId}
              loading={loading}
              refresh={refresh}
              size="sm"
            />
          </CustomModal>

          <RescheduleBooking
            type="RESCHEDULE"
            buttonProps={{
              bg: "transparent",
              border: "1px solid #09B5A9",
              color: "#09B5A9",
              _hover: { background: "transparent" },
              _focus: { boxShadow: "none" },
              fontSize: ".8em",
              size: "sm",
              onClick: () => setOpenRescheduleModal(true),
            }}
            buttonTitle={"Reschedule"}
            availability={availability}
            isOpen={openRescheduleModal}
            onClose={() => setOpenRescheduleModal(false)}
            refresh={refresh}
            doctorId={docId}
            bookingId={bookingId}
          />

          <Button
            color="#fff"
            // p="10px"
            bg="#5C2BA8"
            _hover={{ bg: "#5C2BA8" }}
            onClick={() => handleUpdateStatus()}
            isLoading={loading}
            size="sm"
            fontSize=".8em"
          >
            Approve
          </Button>
        </Stack>
      )}
    </Box>
  );
};
