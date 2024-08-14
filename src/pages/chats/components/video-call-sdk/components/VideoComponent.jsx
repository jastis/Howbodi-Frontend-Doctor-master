import React, { useEffect, useRef, useMemo } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

function VideoComponent(props) {
  const { webcamStream, micStream, webcamOn, micOn, isLocal } = useParticipant(
    props.participantId
  );

  const micRef = useRef(null);
  const webcamRef = useRef(null);

  const webcamMediaStream = useMemo(() => {
    if (!webcamStream?.track) return;
    if (webcamOn) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

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

  const style = {
    width: props.isLocalParticipant ? "" : "100%",
    height: props.isLocalParticipant ? "" : "100%",
  };

  return (
    <div key={props.participantId} style={style}>
      <audio ref={micRef} autoPlay muted={isLocal} />

      <>
        <ReactPlayer
          ref={webcamRef}
          style={{ width: "100%", height: "100%" }}
          //
          playsinline // very very imp prop
          playIcon={<></>}
          //
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={webcamMediaStream}
          //
          height={"100%"}
          width={"100%"}
          onError={(err) => {}}
        />

        {/* <span>
            Mic:{micOn ? "Yes" : "No"}, Camera: {webcamOn ? "Yes" : "No"},
          </span> */}
      </>
    </div>
  );
}

export default VideoComponent;
