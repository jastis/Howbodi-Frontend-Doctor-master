import { Stack } from "@chakra-ui/react";
import { BsMicMute, BsMic } from "react-icons/bs";
import { ImPhoneHangUp } from "react-icons/im";
import { useEffect, useState } from "react";
import RoundButton from "../../RoundButton";

function Controls({ countDownHasCompleted, toggleMic, closeCall }) {
  useEffect(() => {
    //leave call when countdown timer is completed
    if (!countDownHasCompleted) return;
    closeCall();
    //eslint-disable-next-line
  }, [countDownHasCompleted]);

  const [mic, setMic] = useState(true);
  return (
    <Stack
      direction="row"
      bottom={"10px"}
      background="#ffffff24"
      padding="10px 30px"
      borderRadius="33px"
    >
      <RoundButton
        bg="red"
        onClick={() => {
          closeCall();
        }}
        width="40px"
        height="40px"
      >
        <ImPhoneHangUp color="#fff" fontSize="1.5em" />
      </RoundButton>

      <RoundButton
        width="40px"
        height="40px"
        bg="#80808075"
        onClick={() => {
          setMic((prev) => !prev);
          toggleMic();
        }}
      >
        {mic ? <BsMic fontSize="1.5em" /> : <BsMicMute fontSize="1.5em" />}
      </RoundButton>
      {/* <button onClick={toggleWebcam}>toggleWebcam</button> */}
    </Stack>
  );
}

export default Controls;
