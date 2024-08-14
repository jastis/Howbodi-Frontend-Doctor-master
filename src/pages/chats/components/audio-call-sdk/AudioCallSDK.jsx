import JoinScreen from "./components/JoinScreen";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import React, { useState } from "react";
import Container from "./components/Container";

function AudioCallSDK({
  childRef,
  events,
  myId,
  recipientId,
  countDownHasCompleted,
  meetingId,
  videoToken,
  imageUrl,
  participantImageUrl,
  setOpenedMedia,
}) {
  const [isReady, setIsReady] = useState(false);

  const [micOn, setMicOn] = useState(true);
  const [webcamOn, setWebcamOn] = useState(false);

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
        setMicOn={setMicOn}
        imageUrl={imageUrl}
        participantImageUrl={participantImageUrl}
        onMeetingLeave={(callIsDeclined) => {
          setWebcamOn(false);
          setMicOn(false);
          setIsReady(false);
          if (!callIsDeclined) {
            let chatType = JSON.parse(sessionStorage.getItem("chatType")) || [];
            sessionStorage.setItem(
              "chatType",
              JSON.stringify([...chatType, "chat", "audio"])
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
      events={events}
      myId={myId}
      recipientId={recipientId}
      setIsReady={(e) => {
        setOpenedMedia("audio");
        setIsReady(e);
        setMicOn(true);
        setWebcamOn(false);
      }}
    />
  );
}

export default AudioCallSDK;
