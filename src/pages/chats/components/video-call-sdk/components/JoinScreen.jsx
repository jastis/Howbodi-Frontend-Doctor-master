import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { socketClient } from "../../../../../services/socket";

function JoinScreen({ setIsReady, events, recipientId, myId }) {
  //for when the user accept call request
  const click = () => {
    setIsReady(true);
  };
  //start video call when call is accepted
  useEffect(() => {
    if (events?.click) {
      events.click = click;
    }

    //eslint-disable-next-line
  }, [events]);
  return (
    <Button
      onClick={() => {
        socketClient.emit("call", {
          recipient: recipientId,
          initiator: myId,
          callType: "video",
        });
        setIsReady(true);
      }} //when the user is trying to make call request
      bg="transparent"
      _hover={{ background: "transparent" }}
    >
      <IoVideocamOutline fontSize="1.3em" />
    </Button>
  );
}

export default JoinScreen;
