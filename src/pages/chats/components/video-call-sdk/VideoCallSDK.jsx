import JoinScreen from "./components/JoinScreen";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import { Container } from "./components/Container";

function VideoCallSDK({
  childRef,
  events,
  countDownHasCompleted,
  meetingId,
  videoToken,
  recipientId,
  myId,
  setOpenedMedia,
}) {
  const [isReady, setIsReady] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [webcamOn, setWebcamOn] = useState(true);

  return meetingId && isReady ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: micOn,
        webcamEnabled: webcamOn,
        name: "Doctor",
      }}
      reinitialiseMeetingOnConfigChange={true}
      token={videoToken}
    >
      <Container
        ref={childRef}
        events={events}
        recipientId={recipientId}
        setWebcamOn={setWebcamOn}
        setMicOn={setMicOn}
        onMeetingLeave={(callIsDeclined) => {
          setWebcamOn(false);
          setMicOn(false);
          setIsReady(false);
          if (!callIsDeclined) {
            let chatType = JSON.parse(sessionStorage.getItem("chatType")) || [];
            sessionStorage.setItem(
              "chatType",
              JSON.stringify([...chatType, "chat", "video"])
            );
          }
        }}
        meetingId={meetingId}
        setIsReady={setIsReady}
        countDownHasCompleted={countDownHasCompleted}
      />
    </MeetingProvider>
  ) : (
    <JoinScreen
      myId={myId}
      recipientId={recipientId}
      events={events}
      setIsReady={(e) => {
        setOpenedMedia("video");
        setIsReady(e);
        setMicOn(true);
        setWebcamOn(true);
      }}
    />
  );
}

export default VideoCallSDK;
