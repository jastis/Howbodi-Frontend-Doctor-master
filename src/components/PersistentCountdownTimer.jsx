import { Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { BOOKING_TIMER_IN_SECONDS } from "../app/constants";

function PersistentCountdownTimer({
  countDownStartTime,
  seconds = BOOKING_TIMER_IN_SECONDS,
  startTimer = false,
  trackingId,
  refreshOnCountDownComplete,
  setCountDownHasCompleted,
}) {
  const [data, setData] = useState(
    { date: Number(new Date(countDownStartTime)), delay: seconds } //seconds
  );
  const wantedDelay = seconds;

  const getSessionStorageValue = (s) => sessionStorage.getItem(s);

  const Completionist = () => (
    <p style={{ fontWeight: "bold " }}>Chat ended...</p>
  );

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      if (sessionStorage.getItem(`end_date-${trackingId}`) != null) {
        sessionStorage.removeItem(`end_date-${trackingId}`);

        sessionStorage.removeItem("timerDetailsObject");
      }
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <Stack
          background="black"
          color="#fff"
          padding="5px 7px"
          borderRadius="5px"
          direction={"row"}
          fontWeight={"bold"}
          fontSize="1.3em"
        >
          <Text>{hours} </Text>
          <Text>:</Text>
          <Text>{minutes}</Text>
          <Text>:</Text>
          <Text>{seconds}</Text>
        </Stack>
      );
    }
  };

  //Code runs only one time after each reloading
  useEffect(() => {
    const savedDate = getSessionStorageValue(`end_date-${trackingId}`);
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      //Do you reach the end?
      if (delta > wantedDelay) {
        //Yes we clear uour saved end date
        if (sessionStorage.getItem(`end_date-${trackingId}`).length > 0)
          sessionStorage.removeItem(`end_date-${trackingId}`);
      } else {
        //No update the end date
        setData({ date: currentTime, delay: delta });
      }
    }
    //eslint-disable-next-line
  }, []);

  if (!trackingId) return null;

  return startTimer || getSessionStorageValue(`end_date-${trackingId}`) ? (
    <div>
      <Countdown
        intervalDelay={0}
        precision={3}
        date={data.date + data.delay}
        renderer={renderer}
        onStart={(delta) => {
          //Save the end date
          if (sessionStorage.getItem(`end_date-${trackingId}`) === null)
            sessionStorage.setItem(
              `end_date-${trackingId}`,
              JSON.stringify(data.date + data.delay)
            );
        }}
        onComplete={() => {
          if (sessionStorage.getItem(`end_date-${trackingId}`) !== null) {
            sessionStorage.removeItem(`end_date-${trackingId}`);
          }

          setCountDownHasCompleted(true);
          refreshOnCountDownComplete();
        }}
      />
    </div>
  ) : null;
}

export default PersistentCountdownTimer;
