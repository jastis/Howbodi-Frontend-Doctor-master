import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { IoCallOutline } from "react-icons/io5";
import { socketClient } from "../../../../../services/socket";

function JoinScreen({ setIsReady, events, recipientId, myId }) {
  //for when the user accept call request
  const click = () => {
    setIsReady(true);
  };

  useEffect(() => {
    if (events?.click) {
      events.click = click;
    }
    //eslint-disable-next-line
  }, [events]);
  return (
    <Button
      bg="transparent"
      _hover={{ background: "transparent" }}
      onClick={() => {
        socketClient.emit("call", {
          recipient: recipientId,
          initiator: myId,
          callType: "audio",
        });
        setIsReady(true);
      }} //when the user is trying to make call request
    >
      <IoCallOutline fontSize="1.3em" />
    </Button>
  );
}

export default JoinScreen;
