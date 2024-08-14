import { Box, Text, Switch, Stack } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { LinkTo } from "../../nav/components/LinkTo";
import "./index.css";
import { ADMIN_NAV_ITEMS } from "./components/sidebar.constatnt";
import { BiLogOut } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctorInfo,
  updateAvailability,
  updateAvailability2,
} from "../../../pages/profile/service";
import { disconnect } from "../../../services/socket";
import { userOnlineStatus } from "../../../store/actions/displayAction";

const SideBar = ({ toggle }) => {
  // const [doctorInfo, setDoctorInfo] = useState({});
  const [activeIconId, setActiveIconId] = useState("");

  const [availability, setAvailability] = useState(false);

  const doctorId = useSelector((state) => state.auth.docId);
  const currentAvailabilityStatus = useSelector(
    (state) => state?.switchTab?.onlineStatus
  );
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState({});
  const [onlineState, setOnlineState] = useState(false);

  useEffect(() => {
    setOnlineState(currentAvailabilityStatus);
  }, [currentAvailabilityStatus]);

  const handleLogout = () => {
    disconnect();
    sessionStorage.removeItem("HB#221#");
    window.location.href = "/";
  };

  // useEffect(() => {
  //   getDoctorInfo(doctorId, null, setAvailability);
  // }, [doctorId, refresh]);

  const changeAvailability = async (res) => {
    const payload = {
      status: !onlineState,
    };
    await updateAvailability2(doctorId, payload)
      .then((res) => {
        setOnlineState((prev) => {
          dispatch(userOnlineStatus(!prev));

          return !prev;
        });
      })
      .catch(() => null);

    setRefresh({});
  };

  const overrideSwitchStyle = `.css-ddil6j[aria-checked=true], .css-ddil6j[data-checked] {
    background: #299d8f;
}`;

  return (
    <Box bg="#EFEDF3" mt={["110px"]}>
      <Box className="sidebar">
        <Box className="sidebar-inner">
          <Flex flex={1} flexDirection="column">
            {ADMIN_NAV_ITEMS.map(({ title, to, icon: Icon }, id) => {
              return (
                <LinkTo
                  key={id}
                  to={to}
                  title={title}
                  toggle={toggle}
                  id={id}
                  iconComponent={Icon}
                  activeIconId={activeIconId}
                  setActiveIconId={setActiveIconId}
                />
              );
            })}

            <Flex justifyContent={"space-between"}>
              <Flex
                width={["18%"]}
                display={["none", "none", "flex"]}
                mt="60px"
                px="42px"
              >
                <Flex direction={"column"}>
                  {" "}
                  <Text fontSize={"24px"} color="#929292" mr="10px">
                    Availability
                  </Text>
                  <Flex
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    mt="2px"
                  >
                    {" "}
                    <Text color="#929292" fontSize={"16px"}>
                      Off
                    </Text>{" "}
                    <style>{overrideSwitchStyle}</style>
                    <Switch
                      mt="3px"
                      isChecked={onlineState}
                      color="red"
                      onChange={() => {
                        changeAvailability();
                      }}
                    />{" "}
                    <Text color="#929292" fontSize={"16px"}>
                      On
                    </Text>{" "}
                  </Flex>{" "}
                </Flex>
              </Flex>
            </Flex>

            <Box className="link" flex="1">
              <Stack
                cursor="pointer"
                onClick={handleLogout}
                direction="row"
                alignItems="center"
              >
                <BiLogOut fontSize="1.5em" color={"#8C78AB"} />
                <Text fontWeight="bold" color="#929292">
                  Log out
                </Text>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
export default SideBar;
