import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsCameraVideoOff } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "../../../components/fullPageLoader";
import { socketClient } from "../../../services/socket";
import { getChatMessages, lockConversation } from "../services/getChats";
import PatientNoteComponent from "./PatientNote";
import PatientProfileComponent from "./PatientProfile";
import { TypeMessage } from "./TypeMessage";

// import { getDoctorInfo } from "../../profile/service";
import dayjs from "dayjs";
import PersistentCountdownTimer from "../../../components/PersistentCountdownTimer";
import { FiPhoneOff } from "react-icons/fi";
import VideoCallSDK from "./video-call-sdk/VideoCallSDK";
import AudioCallSDK from "./audio-call-sdk/AudioCallSDK";
import { BOOKING_END_MINUTE } from "../../../app/constants";
import { clearCallState } from "../../../store/actions/incomingCallAction";
import { useLocation } from "react-router-dom";
export const ChatsComponents = ({
  displayChat,
  refresh,
  setDisplayOrHideChatFeedForSmScreen,
  displayOrHideChatFeedForSmScreen,
}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatBoxRef, setChatBoxRef] = useState(null);
  // const [doctorInfo, setDoctorInfo] = useState({});
  const doctorId = useSelector((state) => state?.auth?.docId);
  let messagesEnd = useRef(null);
  let location = useLocation();

  const { patientIdOfTimer, startTime: theCountDownStartTime } =
    JSON.parse(sessionStorage.getItem("timerDetailsObject")) || {};
  const timerObjectInSessionStorage = JSON.parse(
    sessionStorage.getItem("timerDetailsObject")
  );

  const [conversationId, setConversationId] = useState("");

  const user = displayChat?.userId || displayChat;
  const dispatch = useDispatch();

  const fullName = `${user?.firstName || "..."} ${user?.lastName || "..."} `;

  const scrollToBottom = () => {
    messagesEnd?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  //get chat conversation id
  useEffect(() => {
    if (messages.length < 1) return;
    setConversationId(messages?.[0]?.conversationId);
  }, [messages]);

  // useEffect(() => {
  //   getDoctorInfo(doctorId, setDoctorInfo);
  // }, [doctorId]);
  const [updateScroll, setUpdateScroll] = useState({});

  useEffect(() => {
    scrollToBottom();
  }, [updateScroll]);

  useEffect(() => {
    if (chatBoxRef) {
      chatBoxRef.scrollTop = chatBoxRef.scrollHeight;
    }
  }, [messages, chatBoxRef]);

  const getMessages = useCallback(() => {
    if (!displayChat?._id) return;
    setLoading(true);
    getChatMessages(
      doctorId,
      displayChat?.userId?._id || displayChat?._id,
      setMessages
    )
      .then((resp) => {
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [doctorId, displayChat]);

  //getting new messages and storing them to local state
  useEffect(() => {
    getMessages();
    setMessages([]);
    //getting new messages and storing them to the messages state
    socketClient.on("private-message", (data) => {
      setUpdateScroll({}); //scroll down when new message is received
      setMessages((v) => [
        ...v,
        { message: data, sender: "Users", createdAt: new Date() },
      ]);
    });
    socketClient.on("attachment", (data) => {
      setUpdateScroll({}); //scroll down when new message is received
      setMessages((v) => [
        ...v,
        { file: data, sender: "Users", createdAt: new Date() },
      ]);
    });

    return () => {
      socketClient?.removeAllListeners("private-message");
      socketClient?.removeAllListeners("attachment");
    };
  }, [getMessages, doctorId, displayChat]);

  function sendMessage(data) {
    setMessages((v) => [...v, data]);
    let dataObj = { ...data };
    if (dataObj.file) {
      dataObj.file = data.file.replace("data:", "").replace(/^.+,/, "");
      socketClient.emit("attachment", dataObj);
    } else {
      socketClient.emit("private-message", dataObj);
    }
  }

  const [countDownHasCompleted, setCountDownHasCompleted] = useState(false);

  //lock Conversation after countdown has finished
  const handleOnComplete = () => {
    socketClient.emit("session-ended", {
      doctorId,
      bookingId: displayChat?.bookingId,
      chatType: JSON.parse(sessionStorage.getItem("chatType")),
    });
    lockConversation(conversationId, true)
      .then(() => {
        //delete countdown start time after completed
        sessionStorage.removeItem("timerDetailsObject");
        sessionStorage.removeItem("chatType");
        refresh();
      })
      .catch(() => {
        sessionStorage.removeItem("timerDetailsObject");
        sessionStorage.removeItem("chatType");
        //reload the browser ones lock chat fails, so they dont still have to be able to type after timeout
        window.location.href = "/chats";
        //clear all call state
        dispatch(clearCallState());
      });
  };

  const shouldStartTimer = useCallback(() => {
    if (!timerObjectInSessionStorage) return false;

    if (patientIdOfTimer !== displayChat?.userId?._id) return false;

    const addXminToTime = dayjs(timerObjectInSessionStorage?.startTime)
      .add(BOOKING_END_MINUTE, "minute")
      .format();

    //if cuurent time is less than the end time, then time hasnt elapsed, else it has
    const timerHasElasped = new Date() > new Date(addXminToTime);
    if (timerHasElasped) return false;

    return true;
  }, [patientIdOfTimer, timerObjectInSessionStorage, displayChat?.userId?._id]);

  const { openVideoCall, openAudioCall } =
    useSelector((state) => state?.getIncomingCallData) || {};

  const childVideoEvents = { click: () => {} }; //call child function from the parent component
  const childAudioEvents = { click: () => {} }; //call child function from the parent component

  useEffect(() => {
    if (openAudioCall === true) {
      childAudioEvents?.click();
    } else if (openVideoCall === true) {
      childVideoEvents?.click();
    } else {
      return;
    }
    //eslint-disable-next-line
  }, [openAudioCall, openVideoCall]);

  //open call when it is being called from a different page
  //and call these function after it has finished loading
  useEffect(() => {
    if (location?.state?.openCall && loading === false) {
      if (openAudioCall === true) {
        childAudioEvents?.click();
      } else if (openVideoCall === true) {
        childVideoEvents?.click();
      } else {
        return;
      }
    }
    //eslint-disable-next-line
  }, [location?.state?.openCall, openAudioCall, openVideoCall, loading]);

  const childAudioRef = useRef(null);
  const childVideoRef = useRef(null);
  //leave call when participant decline the call request
  useEffect(() => {
    socketClient.on("end-call", (data) => {
      const { calltype, endType } = data || {};
      if (calltype === "audio") {
        childAudioRef?.current?.callDeclined({ missedCall: endType });
      } else if (calltype === "video") {
        childVideoRef?.current?.callDeclined({ missedCall: endType });
      }
    });
    //eslint-disable-next-line
  }, []);

  const [openedMedia, setOpenedMedia] = useState("");
  const [lockMedia, setLockMedia] = useState(true);

  useEffect(() => {
    if (displayChat?.isLocked || countDownHasCompleted) {
      if (openedMedia === "video") {
        childVideoRef?.current?.timeOut();
      } else if (openedMedia === "audio") {
        childAudioRef?.current?.timeOut();
      } else {
      }
      setLockMedia(true);
      return;
    }

    //open call if chat is unlock and there a countdown timer in the local storage
    if (displayChat?.isLocked === false && shouldStartTimer()) {
      setLockMedia(false);
    } else {
      if (openedMedia === "video") {
        childVideoRef?.current?.timeOut();
      } else if (openedMedia === "audio") {
        childAudioRef?.current?.timeOut();
      } else {
      }

      setLockMedia(true);
    }
    //eslint-disable-next-line
  }, [
    countDownHasCompleted,
    displayChat?.isLocked,
    openedMedia,
    shouldStartTimer,
  ]);

  return (
    <>
      {loading ? (
        <FullPageLoader h={"80vh"} />
      ) : displayChat?._id ? (
        <Box
          bg="#F6F4F9"
          borderRadius={"10px"}
          h={["100%", "100%", "80vh"]}
          fontSize={"12px"}
          p={["20px 10px", "20px 20px", "20px 30px"]}
          position={["", "", "relative"]}>
          <Stack
            direction="row"
            bg="inherit"
            alignItems={"center"}
            justifyContent="space-between"
            w="100%">
            <Flex mb="10px" alignItems={"center"}>
              <Avatar
                name={fullName}
                src={displayChat?.userId?.image}
                alt=""
                onClick={() =>
                  setDisplayOrHideChatFeedForSmScreen(
                    !displayOrHideChatFeedForSmScreen
                  )
                }
              />
              <Popover closeOnBlur={false}>
                <PopoverTrigger>
                  <Text
                    ml="10px"
                    color="#403058"
                    fontSize="14px"
                    fontWeight={"semibold"}
                    cursor="pointer">
                    {fullName}
                  </Text>
                </PopoverTrigger>
                <PopoverContent
                  _focus={{ border: "none" }}
                  width={{ base: "100%", md: "400px" }}>
                  <PatientProfileComponent user={user} />
                </PopoverContent>
              </Popover>
            </Flex>
            <Stack direction="row" alignItems={"center"}>
              {displayChat?.isLocked === false && shouldStartTimer() ? (
                <PersistentCountdownTimer
                  countDownStartTime={theCountDownStartTime}
                  setCountDownHasCompleted={setCountDownHasCompleted}
                  trackingId={displayChat?.userId?._id}
                  startTimer={!!theCountDownStartTime}
                  refreshOnCountDownComplete={() => handleOnComplete()}
                  conversationId={conversationId}
                />
              ) : null}

              <Flex alignItems={"center"} justifyContent={["flex-end"]}>
                <Popover closeOnBlur={false} isLazy>
                  {({ onClose }) => (
                    <>
                      <PopoverTrigger>
                        <Button
                          size={"sm"}
                          color="#403058"
                          _hover={{ background: "transparent" }}
                          _focus={{ boxShadow: "none" }}
                          variant={"ghost"}
                          fontWeight="bold"
                          leftIcon={<FaPlus fontSize=".6em" />}>
                          {" "}
                          Add Patient Note{" "}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent _focus={{ border: "none" }}>
                        <PatientNoteComponent
                          close={onClose}
                          doctorId={doctorId}
                          patientId={user?._id}
                        />
                      </PopoverContent>
                    </>
                  )}
                </Popover>
                <Text
                  color=""
                  fontSize="14px"
                  fontWeight={"semibold"}
                  cursor="pointer"
                  display={["none", "none", "block"]}></Text>
                <Box mx="30px">
                  {!lockMedia ? (
                    <VideoCallSDK
                      childRef={childVideoRef}
                      events={childVideoEvents}
                      meetingId={displayChat?.videoMeetingDetails?.meetingId}
                      videoToken={displayChat?.videoMeetingDetails?.token}
                      countDownHasCompleted={countDownHasCompleted}
                      recipientId={displayChat?.userId?._id}
                      myId={displayChat?.doctorId?._id}
                      setOpenedMedia={setOpenedMedia}
                    />
                  ) : (
                    <BsCameraVideoOff size="1.4em" color="#403058" />
                  )}
                </Box>

                <Box>
                  {!lockMedia ? (
                    <AudioCallSDK
                      childRef={childAudioRef}
                      events={childAudioEvents}
                      myId={displayChat?.doctorId?._id}
                      recipientId={displayChat?.userId?._id}
                      meetingId={displayChat?.videoMeetingDetails?.meetingId}
                      videoToken={displayChat?.videoMeetingDetails?.token}
                      imageUrl={displayChat?.doctorId?.profilePicture}
                      participantImageUrl={displayChat?.userId?.image}
                      countDownHasCompleted={countDownHasCompleted}
                      setOpenedMedia={setOpenedMedia}
                    />
                  ) : (
                    <FiPhoneOff size="1.4em" color="#403058" />
                  )}
                </Box>
              </Flex>
            </Stack>
          </Stack>
          <Divider my="10px" />
          <style>
            {`
              /* Hide scrollbar for Chrome, Safari and Opera */
            .chat-container::-webkit-scrollbar {
              display: none;
            }

            /* Hide scrollbar for IE, Edge and Firefox */
            .chat-container {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
}
              `}
          </style>
          <Stack
            ref={(ref) => ref && setChatBoxRef(ref)}
            width="100%"
            pb={5}
            maxH={"55vh"}
            overflow="auto"
            className="chat-container">
            {messages?.map((message) => {
              let isReply = message?.sender === "Users";
              return (
                <>
                  <Flex
                    alignItems={"center"}
                    flexDirection={isReply ? "row" : "row-reverse"}
                    justifyContent={isReply ? "start" : "end"}
                    width={"100%"}>
                    <Box>
                      <Text color="#757575" fontWeight={"bold"}>
                        {message?.createdAt &&
                          dayjs(message?.createdAt).format("hh:mm a")}
                      </Text>
                    </Box>
                    <Box
                      bg={isReply ? "#EBE1FC" : "white"}
                      p={5}
                      mx={3}
                      color="#757575"
                      borderRadius={"25px"}
                      borderTopRightRadius={!isReply && "0px"}
                      borderTopLeftRadius={isReply && "0px"}>
                      {message?.file || message?.attachment ? (
                        <img
                          style={{
                            objectFit: "contain",
                            width: "200px",
                            maxHeight: "200px",
                            height: "200px",
                            maxWidth: "200px",
                          }}
                          src={message?.file || message?.attachment}
                          alt="chat_image"
                        />
                      ) : (
                        <>
                          <Text
                            fontWeight={"bold"}
                            color="#000000ad"
                            fontSize={"1.1em"}>
                            {message?.message}{" "}
                          </Text>
                        </>
                      )}
                    </Box>
                  </Flex>
                </>
              );
            })}
          </Stack>
          <Box position={"absolute"} bottom={0} right={0} left={0}>
            {displayChat?.isLocked ? (
              <HStack
                border={"1px solid #EBE1FC"}
                py="20px"
                justifyContent={"center"}>
                <Text fontWeight="bold" fontSize="1.2em" color="#8C78AB">
                  You can't reply to this chat, you can only chat when you have
                  an active appointment
                </Text>
              </HStack>
            ) : //open input message if chat is unlock and there a countdown timer in the session storage
            displayChat?.isLocked === false && shouldStartTimer() ? (
              <TypeMessage
                conversationId={conversationId}
                patient={displayChat}
                sendMessage={(e) => {
                  setUpdateScroll({});
                  sendMessage(e);
                }}
              />
            ) : (
              <HStack
                border={"1px solid #EBE1FC"}
                py="20px"
                justifyContent={"center"}>
                <Text fontWeight="bold" fontSize="1.2em" color="#8C78AB">
                  You can't reply to this chat, you can only chat when you have
                  an active appointment
                </Text>
              </HStack>
            )}
          </Box>
        </Box>
      ) : (
        <Stack
          justifyContent={"center"}
          bg="#F6F4F9"
          borderRadius={"10px"}
          h={["100%", "100%", "80vh"]}
          fontSize={"12px"}
          p={["20px 10px", "20px 20px", "20px 30px"]}
          position={["", "", "relative"]}>
          <Text textAlign={"center"}> No User Selected </Text>
        </Stack>
      )}
    </>
  );
};
