import React, { useEffect, useRef } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import { Avatar } from "@chakra-ui/react";

function AudioComponent(props) {
  const { micStream, micOn, isLocal } = useParticipant(props.participantId);

  const micRef = useRef(null);

  useEffect(() => {
    if (!micStream?.track) return;
    if (micRef.current) {
      if (micOn) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) => console.error("mic  play() failed", error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div key={props.participantId}>
      <audio ref={micRef} autoPlay muted={isLocal} />

      <Avatar
        src={
          props?.localParticipantId === props?.participantId
            ? props?.imageUrl
            : props?.participantImageUrl
        }
      />
    </div>
  );
}

export default AudioComponent;
