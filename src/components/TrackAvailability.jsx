import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTOMATICALLY_TURN_OFF_TRACK_AVAILABILITY_TIMER_IF_NO_OPTION_CLICKED,
  TRACK_AVAILABILITY_TIMER,
} from "../app/constants";
import {
  getDoctorInfo,
  updateDoctorAvailability,
} from "../pages/profile/service";
import { userOnlineStatus } from "../store/actions/displayAction";

function TrackAvailability({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [counter, setCounter] = useState(0);
  const turnOffCounterInitialNumber =
    AUTOMATICALLY_TURN_OFF_TRACK_AVAILABILITY_TIMER_IF_NO_OPTION_CLICKED;
  const [turnOffCounter, setTurnOffCounter] = useState(
    turnOffCounterInitialNumber
  );
  const [firstTimeMounting, setFirstTimeMounting] = useState(true);
  const [loading, setLoading] = useState(false);
  const stopSeconds = TRACK_AVAILABILITY_TIMER;
  const doctorId = useSelector((state) => state.auth.docId);
  const dispatch = useDispatch();
  const [availability, setAvailability] = useState(false);

  useEffect(() => {
    getDoctorInfo(doctorId, null, setAvailability);
  }, [doctorId]);

  // start counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (firstTimeMounting && counter >= 2) {
      onOpen();
      return;
    }
    // only show modal when counter is now x seconds/minute/hour
    if (counter !== stopSeconds) return;
    onOpen();
    // eslint-disable-next-line
  }, [counter]);

  // count down to turn off availability, if user doesnt select any options
  useEffect(() => {
    if (firstTimeMounting) return false;
    // reject if remaining counter is not equal to x seconds/minute/hour
    if (counter < stopSeconds) return;

    const interval2 = setInterval(() => {
      setTurnOffCounter((prev) => {
        if (prev <= 0) {
          turnOffAndReset();
          return clearInterval(interval2);
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval2);
    // eslint-disable-next-line
  }, [firstTimeMounting, counter]);

  const turnOffAndReset = () => {
    handleNo();
    setTurnOffCounter(turnOffCounterInitialNumber);
  };

  const handleNo = async () => {
    if (firstTimeMounting) {
      setFirstTimeMounting(false);
    }
    onClose();
    setCounter(0);
    dispatch(userOnlineStatus(false));

    setTurnOffCounter(turnOffCounterInitialNumber);

    const payload = { status: false };
    await updateDoctorAvailability(doctorId, payload);
  };

  const handleYes = async () => {
    if (firstTimeMounting) {
      setFirstTimeMounting(false);
    }

    setLoading(true);
    // update availability
    const payload = { status: true };
    updateDoctorAvailability(doctorId, payload, setLoading)
      .then(() => {
        onClose();
        dispatch(userOnlineStatus(true));
        setCounter(0);
      })
      .catch(() => alert("pls try again"));
  };

  return (
    <>
      {children}

      <Modal isOpen={isOpen} onClose={handleNo} isCentered>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            {firstTimeMounting ? (
              <>
                {" "}
                <Text fontWeight={"bold"} fontSize="1.5em" color="#2A2047">
                  Do you want to turn ON your availability?
                </Text>
                <Stack direction="row" my="30px">
                  <Button
                    bg="#09b5a9"
                    _hover={{ background: "#09b5a9" }}
                    _focus={{ background: "#09b5a9" }}
                    color="#fff"
                    flex="1"
                    onClick={handleYes}
                    isLoading={loading}
                  >
                    Yes, sure
                  </Button>
                  <Button
                    bg="transparent"
                    color="#000000ab"
                    _focus={{ background: "transparent" }}
                    _hover={{ background: "transparent" }}
                    border="1px solid #efefef"
                    flex="1"
                    onClick={handleNo}
                  >
                    Turn off for now
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Text fontWeight={"bold"} fontSize="1.5em" color="#2A2047">
                  Do you want to continue being available?
                </Text>
                <Stack direction="row" my="30px">
                  <Button
                    bg="#09b5a9"
                    _hover={{ background: "#09b5a9" }}
                    _focus={{ background: "#09b5a9" }}
                    color="#fff"
                    flex="1"
                    onClick={handleYes}
                    isLoading={loading}
                  >
                    Yes, sure
                  </Button>
                  <Button
                    bg="transparent"
                    color="#000000ab"
                    _focus={{ background: "transparent" }}
                    _hover={{ background: "transparent" }}
                    border="1px solid #efefef"
                    flex="1"
                    onClick={handleNo}
                  >
                    Turn off for now
                  </Button>
                </Stack>
                <Text fontSize={".8em"}>
                  Your availability will be turned off automatically in{" "}
                  <span style={{ color: "#09b5a9" }}>
                    {turnOffCounter} seconds
                  </span>{" "}
                </Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TrackAvailability;
