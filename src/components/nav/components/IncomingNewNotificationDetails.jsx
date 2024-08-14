import { Stack, Text, Box } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { useHistory } from "react-router-dom";

function IncomingNewNotificationDetails({
  show,
  details,
  onCloseNotification,
}) {
  const history = useHistory();
  const { title, message } = details || {};
  return show ? (
    <Stack
      bg="#fff"
      borderRadius={"10px"}
      p="15px"
      position={"absolute"}
      left="-150px"
      top="50px"
      border="1px solid #efedf3"
      width="220px"
      color="#252525"
      maxW="220px"
    >
      <FaTimes
        onClick={() => onCloseNotification()}
        style={{
          fontSize: ".8em",
          position: "absolute",
          right: "20px",
          color: "grey",
        }}
      />
      <Box
        onClick={() => {
          if (!details?.extraDetails?.bookingDate) return;
          history.push({
            pathname: "/calendar",
            state: { date: details?.extraDetails?.bookingDate, tab: 1 },
          });
          onCloseNotification();
        }} 
      >
        <Text fontSize="1.3em" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize=".8em">{message}</Text>
      </Box>
    </Stack>
  ) : null;
}

export default IncomingNewNotificationDetails;
