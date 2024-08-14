import { Box, Flex, Text } from "@chakra-ui/react";
// import { format, getDate } from 'date-fns';
import dayjs from "dayjs";
import React from "react";
import { useHistory } from "react-router-dom";

// import { updateBookings } from "../../calender/services/updateBookings";

export const NotificationCard = ({ data, setRefresh }) => {
  const history = useHistory();
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  // const [date, setDate] = useState();
  // const [loading, setLoading] = useState(false);

  // const handleSingleDate = (date) => {
  //   setDate(date);
  // };

  // const handleUpdateStatus = (bookingId) => {
  //   setLoading(true);
  //   const payload = {
  //     status: "APPROVED",
  //   };
  //   updateBookings(bookingId, payload).then(() => setRefresh(true));
  //   setLoading(false);
  // };

  return (
    <Box p="10px 30px" color="#929292">
      <Flex alignItems={"center"} mb="5px">
        {/* <Avatar src={""} name={data?.name} alt="" size={"md"} /> */}
        <Box
          ml="20px"
          cursor={data?.extraDetails?.bookingDate ? "pointer" : "default"}
          onClick={() => {
            if (!data?.extraDetails?.bookingDate) return;
            history.push({
              pathname: "/calendar",
              state: { date: data?.extraDetails?.bookingDate, tab: 1 },
            });
          }}
        >
          <Text color="#352848" fontWeight="bold" fontSize=".9em">
            {data?.title}
          </Text>
          <Text fontSize=".87em">{data?.message}</Text>
          <Text fontSize={".7em"}>{dayjs(data?.createdAt).from(dayjs())}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
