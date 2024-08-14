import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Redirect, Route, Switch } from "react-router";
import { PROTECTED_PATHS } from "./constants";
import { Navigation } from "../components/nav";
import SideBar from "../components/layout/sidebar";
import { Dashboard } from "../pages/dashboard/";
import { Doctors } from "../pages/doctors";
import { Payments } from "../pages/payments";
import { Chats } from "../pages/chats";
import { Notifications } from "../pages/notifications";
import Calender from "../pages/calender";
import { Patients } from "../pages/patients";
import { Profile } from "../pages/profile";
import { UserProfileContextProvider } from "../context/UserContext";
import { connect, disconnect } from "../services/socket";
import { useSelector } from "react-redux";
import FullPageLoader from "../components/fullPageLoader";
import { getDoctorInfo } from "../pages/profile/service";
import { Link } from "react-router-dom";
import TrackAvailability from "../components/TrackAvailability";
// import {getDoctorInfo} from "../"

const AuthenticatedApp = () => {
  const [toggleSide, setToggleSide] = useState(false);
  const [showSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileScreen] = useMediaQuery("(max-width: 600px)");
  const doctorId = useSelector((state) => state?.auth?.docId);
  const [doctorInfo, setDoctorInfo] = useState({});

  useEffect(() => {
    getDoctorInfo(doctorId, setDoctorInfo);
  }, [doctorId]);

  const {
    DASHBOARD,
    PAYMENTS,
    DOCTORS,
    CHATS,
    PROFILE,
    CALENDAR,
    PATIENTS,
    NOTIFICATIONS,
  } = PROTECTED_PATHS;

  const handleToggle = () => {
    setToggleSide((initial) => !initial);
  };

  useEffect(() => {
    if (isMobileScreen) {
      setToggleSide((initial) => !initial);
    }
  }, [isMobileScreen]);

  useEffect(() => {
    connect({ name: doctorId, type: "Doctors" }).then(() => {
      setIsLoading(false);
    });
    return disconnect;
  }, [doctorId]);

  return (
    <UserProfileContextProvider>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <TrackAvailability>
          <Box
            className="App"
            display="flex"
            flexDirection={"column"}
            position="relative"
          >
            {doctorInfo?.availability?.length < 1 && (
              <Box
                bg="#09b5a9"
                color="#fff"
                position="fixed"
                top="0"
                width="100%"
                height="20px"
                zIndex="1999"
                fontSize=".9em"
              >
                <Text textAlign={"center"} fontWeight="bold">
                  You currently haven't set your availability periods.{" "}
                  <Link to="/calendar">Click here to set </Link>
                </Text>
              </Box>
            )}

            <Box className={`app-container`}>
              <Box
                className="app-sidebar"
                display={`${toggleSide ? "none" : "block"}`}
              >
                {showSidebar ? <SideBar toggle={handleToggle} /> : ""}
              </Box>
              {/* app right */}
              <Box
                width={`calc(100% - ${!toggleSide ? "250px" : "0px"})`}
                h="100%"
              >
                <Navigation
                  toggle={handleToggle}
                  SideBarActive={toggleSide}
                  showSidebar={showSidebar}
                />
                <Box
                  width="100%"
                  maxWidth="100%"
                  mt="90px"
                  padding={["5px", "10px", "20px"]}
                >
                  <Switch>
                    <Route path={"/"} exact component={Dashboard} />
                    <Route path={DASHBOARD} exact component={Dashboard} />
                    <Route path={PAYMENTS} exact component={Payments} />
                    <Route
                      path={NOTIFICATIONS}
                      exact
                      component={Notifications}
                    />
                    <Route path={PATIENTS} exact component={Patients} />
                    <Route path={DOCTORS} exact component={Doctors} />
                    <Route path={CHATS} exact component={Chats} />
                    <Route path={CALENDAR} exact component={Calender} />
                    <Route path={PROFILE} exact component={Profile} />
                    <Redirect from="/*" to={DASHBOARD} />
                  </Switch>
                </Box>
              </Box>
            </Box>
          </Box>
        </TrackAvailability>
      )}
    </UserProfileContextProvider>
  );
};

export default AuthenticatedApp;
