import { useMeeting } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Box, Spinner } from "@chakra-ui/react";
import AudioComponent from "./AudioComponent";
import ActiveSpeakerAnimation from "../../ActiveSpeakerAnimation";
import { errorNotifier } from "../../../../../components/NotificationHandler";

export const Container = forwardRef(
  (
    {
      setMicOn,
      onMeetingLeave,
      setIsReady,
      countDownHasCompleted,
      imageUrl,
      participantImageUrl,
    },
    ref
  ) => {
    const [joined, setJoined] = useState(false);
    const [activeSpeakerId, setActiveSpeakerId] = useState("");
    const [callIsDeclined, setCallIsDeclined] = useState(false);

    function onMeetingLeft() {
      onMeetingLeave(callIsDeclined);
    }

    const { join, participants, localParticipant, leave, toggleMic } =
      useMeeting({
        onMeetingLeft,
        onSpeakerChanged: (activeSpeakerId) => {
          setActiveSpeakerId(activeSpeakerId);
        },
      });

    useImperativeHandle(ref, () => ({
      //for when the user(user2) declines call request,then cut user 1 call too
      callDeclined({ missedCall }) {
        let count = 0;
        let maxTries = 3;

        while (true) {
          try {
            leave();
            setCallIsDeclined(true);
            setMicOn(false);
            setIsReady(false);
            if (!missedCall) {
              errorNotifier("Patient has declined the call");
            }
            break;
          } catch {
            if (++count === maxTries) break;
          }
        }
      },
      timeOut() {
        let count = 0;
        let maxTries = 3;

        while (true) {
          try {
            leave();
            setCallIsDeclined(true);
            setMicOn(false);
            setIsReady(false);
            break;
          } catch {
            if (++count === maxTries) break;
          }
        }
      },
    }));

    const joinMeeting = () => {
      setJoined(true);
      join();
    };

    //call join method after 4 seconds
    useEffect(() => {
      setTimeout(() => {
        joinMeeting();
      }, 4000);
      //eslint-disable-next-line
    }, []);

    // Helper function for participant loop.
    const chunk = (arr) => {
      const newArr = [];
      while (arr.length) newArr.push(arr.splice(0, 3));
      return newArr;
    };

    return (
      <div className="container">
        {joined ? (
          <Box
            top="0"
            background="#00000069"
            left="0"
            zIndex="999"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            position="fixed"
          >
            <Box
              width={["320px", "570px"]}
              height="320px"
              style={{
                color: "#fff",
                background: "#000",
                display: "flex",
                position: "absolute",
                overflow: "hidden",

                borderRadius: "10px",
                zIndex: "999",
                justifyContent: "center",
              }}
            >
              <div
                style={{ position: "absolute", bottom: "50px", zIndex: "999" }}
              >
                <Controls
                  closeCall={() => {
                    let count = 0;
                    let maxTries = 3;

                    while (true) {
                      try {
                        leave();
                        setIsReady(false);
                        setMicOn(false);
                        setJoined(false);

                        break;
                      } catch {
                        if (++count === maxTries) break;
                      }
                    }
                  }}
                  toggleMic={toggleMic}
                  countDownHasCompleted={countDownHasCompleted}
                />
              </div>

              {chunk([...participants.keys()]).map((k, id) => (
                <Box
                  key={id}
                  display={"flex"}
                  alignItems="center"
                  justifyContent={"center"}
                >
                  {k.map((participantId) => {
                    return (
                      <Box
                        key={participantId}
                        m="20px"
                        width="100px"
                        height="100px"
                        display={"flex"}
                        justifyContent="center"
                        alignItems={"center"}
                        position={"relative"}
                        background="#ffffff26"
                        borderRadius="10px"
                      >
                        {localParticipant?.id === activeSpeakerId && (
                          <ActiveSpeakerAnimation />
                        )}
                        <AudioComponent
                          localParticipantId={localParticipant?.id}
                          imageUrl={imageUrl}
                          participantImageUrl={participantImageUrl}
                          participantId={participantId}
                        />
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
);

export default Container;
