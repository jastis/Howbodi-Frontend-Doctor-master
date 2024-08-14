import "./index.css";
import {
  Box,
  Text,
  Avatar,
  Stack,
  Image,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
// import dayjs from "dayjs"
// import { SearchBar } from "../SearchBar";
import { RiMenu2Fill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getComponentTitle } from "./components/GetComponentTitle";
import { socketClient } from "../../services/socket";
import { customSuccessNotifier } from "../NotificationHandler";
import IncomingNewNotificationDetails from "./components/IncomingNewNotificationDetails";
import clickSound from "../../assets/sound/click.mp3";
import { getDoctorInfo } from "../../pages/profile/service";
import { useDispatch, useSelector } from "react-redux";
import howbodiLogo from "../../assets/icons/howbodi_logo.svg";
import {
  clearCallState,
  getIncomingCallData,
} from "../../store/actions/incomingCallAction";
import IncomingCallPopup from "./components/IncomingCallPopup";
import ringSound from "../../assets/sound/phone-ringing-7006.mp3";

export const Navigation = ({ toggle, showSidebar }) => {
  const doctorId = useSelector((state) => state.auth.docId);

  const [toggleSide] = useState(false);
  const history = useHistory();
  const [doctorInfo, setDoctorInfo] = useState({});

  useEffect(() => {
    getDoctorInfo(doctorId, setDoctorInfo);
  }, [doctorId]);

  const location = useLocation();
  const pathname = location.pathname;

  const dispatch = useDispatch();

  const handleToggle = () => {
    toggle(!toggleSide);
  };

  const [newIncomingNotification, setNewIncomingNotification] = useState(false);
  const [
    showNewIncomingNotificationDetails,
    setShowNewIncomingNotificationDetails,
  ] = useState(false);

  const [notificationDetails, setNotificationDetails] = useState({});

  const { incomingCall, ring } =
    useSelector((state) => state?.getIncomingCallData) || {};
  const r = useSelector((state) => state?.getIncomingCallData) || {};

  useEffect(() => {
    socketClient.on("in-app-notification", (data) => {
      //play sound when a new notification comes in
      const audio = new Audio(clickSound);
      audio?.play();

      setNewIncomingNotification(true);
      setNotificationDetails(data);

      const func = ({ onClose }) => {
        return (
          <Stack
            color="white"
            p={3}
            bg="#303030"
            borderRadius={"5px"}
            position="relative"
            cursor={data?.extraDetails?.bookingDate ? "pointer" : "default"}
            onClick={() => {
              if (!data?.extraDetails?.bookingDate) return;
              history.push({
                pathname: "/calendar",
                state: { date: data?.extraDetails?.bookingDate, tab: 1 },
              });
              onClose();
            }}
          >
            <FaTimes
              cursor={"pointer"}
              onClick={() => onClose()}
              style={{ position: "absolute", right: "10px" }}
            />

            <Text fontWeight="bold" fontSize={".8em"}>
              {data?.title}
            </Text>
            <Text fontSize=".7em">{data?.message}</Text>
          </Stack>
        );
      };

      customSuccessNotifier({
        func,
      });
    });
    //eslint-disable-next-line
  }, []);

  const [callDataObject, setCallDataObject] = useState({});
  const [stop, setStop] = useState(true);

  //these is listening for incoming calls
  useEffect(() => {
    socketClient.on("ring", (data) => {
      const { calltype } = data || {};
      setCallDataObject(data);
      setStop(false);
      dispatch(
        getIncomingCallData({ incomingCall: true, callType: calltype, ...data })
      );
    });
    //eslint-disable-next-line
  }, []);

  const timer = useRef(null);
  //after x minutes of ringing, and no one answers the call, close it
  useEffect(() => {
    if (stop === false) {
      timer.current = setTimeout(() => {
        // if (stop === false) {
        socketClient.emit("end-call", {
          ...callDataObject,
          endType: "missed",
        });
        dispatch(clearCallState());
        setStop(true);
        return;
        // }
      }, 30000); //30 seconds in milisecond
    }
    //eslint-disable-next-line
  }, [stop]);

  useEffect(() => {
    if (!timer?.current) return;

    if (stop === true) {
      clearInterval(timer?.current);
    }
  }, [stop, timer]);

  //ring when theres incoming call
  const [audio] = useState(() => new Audio(ringSound));
  useEffect(() => {
    if (!incomingCall?.incomingCall) return;
    audio.loop = true;
    audio?.play();
    //eslint-disable-next-line
  }, [incomingCall?.incomingCall]);

  useEffect(() => {
    if (ring === false) {
      audio.pause();
      audio.currentTime = 0;
    }
    //eslint-disable-next-line
  }, [ring]);

  return (
    <Box position="relative">
      {incomingCall?.incomingCall && (
        <IncomingCallPopup
          hasClicked={() => setStop(true)}
          incomingCall={incomingCall}
          callDataObject={callDataObject}
        />
      )}
      <Box
        className="navigation-inner"
        fontSize={{ sm: ".9em", md: ".9em", lg: "1em" }}
        px="20px"
        bg="#EFEDF3"
        zIndex={"999"}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Flex
            className="brand-style"
            justifyContent={"center"}
            alignItems="center"
          >
            <Flex>
              <Box className="toggle-side-bar" mr="10px">
                {showSidebar && (
                  <RiMenu2Fill
                    color="#000"
                    onClick={handleToggle}
                    size={30}
                    style={{ cursor: "pointer", paddingLeft: "10px" }}
                  />
                )}
              </Box>
            </Flex>

            {/* <Image
            objectFit="cover"
            w="60px"
            h="60px"
            borderRadius="50%"
            src={company?.brandLogo}
            alt="admin"
          /> */}
            <Box mr="40px">
              <Image src={howbodiLogo} alt="logo" />
            </Box>
            <Text
              fontFamily="Gilroy-Bold"
              fontWeight="bold"
              color="#403058"
              fontSize={[".9em", "30px"]}
            >
              {getComponentTitle(pathname)}
            </Text>
          </Flex>

          <Flex justifyContent={["flex-end"]} alignItems="center">
            {/* <Box mr="5%">
              <SearchBar placeholder="search" />
            </Box> */}
            <Box
              mr="5%"
              cursor="pointer"
              position="relative"
              border={"1px solid #DFD2F5"}
              borderRadius="50%"
              padding="6px"
            >
              <Box
                onClick={() => {
                  setNewIncomingNotification(false);
                  setShowNewIncomingNotificationDetails(true);
                }}
              >
                {newIncomingNotification && (
                  <Box
                    bg="#09B5A9"
                    width="8px"
                    height={"8px"}
                    borderRadius="50%"
                    position={"absolute"}
                    right="5px"
                  />
                )}
                <BsBell size={"1.1em"} color={"#403058"} />
              </Box>

              <IncomingNewNotificationDetails
                details={notificationDetails}
                show={showNewIncomingNotificationDetails}
                onCloseNotification={() => {
                  setShowNewIncomingNotificationDetails(false);
                  setNotificationDetails({});
                }}
              />
            </Box>
            <Box mr="5%">
              <Avatar
                bg={"#403058"}
                color="#fff"
                src={doctorInfo?.profilePicture}
                name={doctorInfo?.name}
                alt={`Picture of ${doctorInfo?.name}`}
                cursor="pointer"
                onClick={() => history.push("/profile")}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
