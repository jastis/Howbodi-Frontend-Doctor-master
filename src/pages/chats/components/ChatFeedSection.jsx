import { Box } from "@chakra-ui/react";
import React from "react";
import { ChatsComponents } from "./Chats";

export const ChatFeedSection = ({
  sendUserId,
  displayChat,
  // refresh,
  setDisplayOrHideChatFeedForSmScreen,
  displayOrHideChatFeedForSmScreen,
  reloadChatFeed,
}) => {
  return (
    <Box>
      <ChatsComponents
        sendUserId={(e) => sendUserId(e)}
        displayChat={displayChat}
        // refresh={refresh}
        setDisplayOrHideChatFeedForSmScreen={
          setDisplayOrHideChatFeedForSmScreen
        }
        displayOrHideChatFeedForSmScreen={displayOrHideChatFeedForSmScreen}
        reloadChatFeed={() => reloadChatFeed()}
        refresh={() => reloadChatFeed()}
      />
    </Box>
  );
};
