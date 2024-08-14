import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChatFeedSection } from "./components/ChatFeedSection";
import { ChatListSection } from "./components/ChatListSection";
import { getConversations } from "./services/getChats";
import { useSelector } from "react-redux";
import { BOOKING_END_MINUTE } from "../../app/constants";
import dayjs from "dayjs";

export const Chats = (props) => {
  const location = useLocation();

  const [displayChat, setDisplayChat] = useState({});

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [
    displayOrHideChatFeedForSmScreen,
    setDisplayOrHideChatFeedForSmScreen,
  ] = useState(true);

  const [contacts, setContacts] = useState([]);
  const doctorId = useSelector((state) => state?.auth?.docId);

  const [reloadChatFeed, setReloadChatFeed] = useState({});

  const [refresh, setRefresh] = useState({});
  const [conversationData, setConversationData] = useState([]);

  // const getConversationList = useCallback(() => {
  //   getConversations(doctorId)
  //     .then((data) => {
  //       setContacts([...data]);
  //       setDisplayChat((val) =>
  //         val
  //           ? data?.find((item) => item?.userId?._id === val?.userId?._id)
  //           : data?.[0]
  //       );
  //     })
  //     .catch((e) => {
  //     });
  // }, [doctorId]);

  useEffect(() => {
    setLoading(true);
    getConversations(doctorId)
      .then((data) => {
        setConversationData(data);
        setContacts([...data]);
        const getPatientDataFromLink = location?.state?.user;
        if (getPatientDataFromLink) {
          const getFullPatientObject = data?.find(
            (obj) => obj?.userId?._id === getPatientDataFromLink?.userId?._id
          );

          if (!getFullPatientObject) {
            setDisplayChat(data?.[0]);
            return;
          }

          setDisplayChat(getFullPatientObject);
        } else {
          setDisplayChat(data?.[0]);
        }
      })
      .catch((e) => null)
      .finally(() => {
        setLoading(false);
      });
  }, [doctorId, reloadChatFeed, location?.state?.user]);

  // get timer of the conversation data, and store in local storage if time hasnt expired
  useEffect(() => {
    if (!conversationData) return;
    const filterConversationData = conversationData?.find(
      (data) => data?.userId?._id === displayChat?.userId?._id
    );

    const getStartTimer = filterConversationData?.timer;
    const timerHasNotExpired =
      new Date() <
      new Date(dayjs(getStartTimer).add(BOOKING_END_MINUTE, "minute").format())
        ? true
        : false;

    if (getStartTimer && timerHasNotExpired) {
      const patientIdOfTimer = filterConversationData?.userId?._id;
      sessionStorage.setItem(
        "timerDetailsObject",
        JSON.stringify({
          startTime: dayjs(getStartTimer).format(), //convert it to local format,
          patientIdOfTimer,
        })
      );
    }
  }, [displayChat, conversationData, refresh]);

  return (
    <Box>
      <Stack
        spacing="10px"
        width="100%"
        direction={["column", "column", "row"]}
        justifyContent={"space-between"}
        display={["flex", "flex", "none"]}
      >
        {displayOrHideChatFeedForSmScreen ? (
          <Box flex="2" maxW="300px">
            <ChatListSection
              // getData={contacts}
              loading={loading}
              contacts={contacts}
              activeIndex={activeIndex}
              patientId={displayChat}
              setActiveIndex={setActiveIndex}
              setDisplayChat={setDisplayChat}
              setDisplayOrHideChatFeedForSmScreen={
                setDisplayOrHideChatFeedForSmScreen
              }
              displayOrHideChatFeedForSmScreen={
                displayOrHideChatFeedForSmScreen
              }
            />
          </Box>
        ) : (
          <Box flex="5">
            <ChatFeedSection
              displayChat={displayChat}
              setDisplayOrHideChatFeedForSmScreen={
                setDisplayOrHideChatFeedForSmScreen
              }
              displayOrHideChatFeedForSmScreen={
                displayOrHideChatFeedForSmScreen
              }
              reloadChatFeed={() => setReloadChatFeed({})}
            />
          </Box>
        )}
      </Stack>
      <Stack
        spacing="10px"
        width="100%"
        direction={["column", "column", "row"]}
        justifyContent={"space-between"}
        display={["none", "none", "flex"]}
      >
        <Box flex="2" maxW="300px">
          <ChatListSection
            // getData={contacts}
            loading={loading}
            contacts={contacts}
            displayChat={displayChat}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setDisplayChat={setDisplayChat}
            setDisplayOrHideChatFeedForSmScreen={
              setDisplayOrHideChatFeedForSmScreen
            }
            displayOrHideChatFeedForSmScreen={displayOrHideChatFeedForSmScreen}
          />
        </Box>
        <Box flex="5">
          <ChatFeedSection
            displayChat={displayChat}
            refresh={() => setRefresh({})}
            setDisplayOrHideChatFeedForSmScreen={
              setDisplayOrHideChatFeedForSmScreen
            }
            displayOrHideChatFeedForSmScreen={displayOrHideChatFeedForSmScreen}
            reloadChatFeed={() => setReloadChatFeed({})}
          />
        </Box>
      </Stack>
    </Box>
  );
};
