import { Stack, Text } from "@chakra-ui/react";
import {
  clearCallState,
  openAudioCall,
  openVideoCall,
} from "../../../store/actions/incomingCallAction";
import { MdCall, MdCallEnd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BOOKING_END_MINUTE } from "../../../app/constants";
import dayjs from "dayjs";
import { errorNotifier } from "../../NotificationHandler";
import { socketClient } from "../../../services/socket";

function IncomingCallPopup({ callDataObject, hasClicked }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { incomingCall } =
    useSelector((state) => state?.getIncomingCallData) || {};

  const onOpenVideoCall = () => {
    dispatch(openVideoCall(true));
  };

  const onOpenAudioCall = () => {
    dispatch(openAudioCall(true));
  };

  const hasTimeElapsed = () => {
    const timerObjectInSessionStorage = JSON.parse(
      sessionStorage.getItem("timerDetailsObject")
    );
    if (!timerObjectInSessionStorage) return true;

    const addXminToTime = dayjs(timerObjectInSessionStorage?.startTime)
      .add(BOOKING_END_MINUTE, "minute")
      .format();

    //if cuurent time is less than the end time, then time hasnt elapsed, else it has
    const timerHasElasped = new Date() > new Date(addXminToTime);
    if (timerHasElasped) return true;

    return false;
  };

  const openCall = () => {
    hasClicked();
    if (hasTimeElapsed() === true) {
      errorNotifier("Scheduled time has elapsed");
      dispatch(clearCallState());
    }
    if (
      incomingCall?.callType.toLowerCase() === "video" &&
      hasTimeElapsed() === false
    ) {
      onOpenVideoCall();
      if (window.location.pathname !== "/chats") {
        history.push({
          pathname: "/chats",
          state: {
            openCall: true,
          },
        });
      }
    } else if (
      incomingCall?.callType.toLowerCase() === "audio" &&
      hasTimeElapsed() === false
    ) {
      onOpenAudioCall();
      if (window.location.pathname !== "/chats") {
        history.push({
          pathname: "/chats",
          state: {
            openCall: true,
          },
        });
      }
    } else {
      return;
    }
  };

  const declineCall = () => {
    hasClicked();
    dispatch(clearCallState());
    socketClient.emit("end-call", { ...callDataObject });
  };
  const ROUND_BOX_STYLE = {
    justifyContent: "center",
    alignItems: "center",
    w: "50px",
    h: "50px",
    maxW: "50px",
    maxH: "50px",
    p: "10px",
    borderRadius: "33px",
    cursor: "pointer",
  };
  return (
    <Stack
      position={"fixed"}
      borderRadius="20px"
      top="20px"
      right="30px"
      w="300px"
      maxW="300px"
      h="180px"
      maH="180px"
      bg="#135c53"
      zIndex={"1999"}
      p="20px"
      spacing={"30px"}
      boxShadow="2px 4px 11px 2px #4545453b"
    >
      <Text textAlign={"center"} fontWeight="bold" color="#fff">
        {`Incoming ${incomingCall?.callType} call`}
      </Text>
      <Stack direction={"row"} justifyContent="space-evenly">
        <Stack>
          {" "}
          <Stack {...ROUND_BOX_STYLE} bg="green" onClick={() => openCall()}>
            <MdCall color="#fff" fontSize={"1.5em"} />
          </Stack>
          <Text color="#fff" fontSize={".72em"}>
            Answer call
          </Text>
        </Stack>

        <Stack>
          <Stack {...ROUND_BOX_STYLE} bg="red" onClick={() => declineCall()}>
            <MdCallEnd color="#fff" fontSize={"1.5em"} />
          </Stack>
          <Text color="#fff" fontSize={".72em"}>
            Decline call
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default IncomingCallPopup;
