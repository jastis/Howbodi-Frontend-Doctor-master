import {
  Box,
  Tabs,
  Tab,
  TabList,
  Flex,
  Text,
  TabPanel,
  TabPanels,
  Circle,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  getAllNotifications,
  getAppointmentNotifications,
} from "./services/getNotifications";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NotificationList } from "./components/NotificationList";

export const Notifications = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [appointmentNotifications, setAppointmentNotifications] = useState([]);

  const [setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const doctorId = useSelector((state) => state?.auth?.docId);

  const TAB_TITLES = [
    { name: "All", selected: "#686278" },
    { name: "Appointments", selected: "#686278" },
  ];

  useEffect(() => {
    getAllNotifications().then((res) => {
      setAllNotifications(res);
      setLoading(false);
    });

    getAppointmentNotifications().then((res) => {
      setAppointmentNotifications(res);
      setLoading(false);
    });
    //eslint-disable-next-line
  }, [doctorId, refresh]);

  // const appointments = notifications?.filter(
  //   (data) => data?.title?.toLowerCase() === "appointment"
  // );

  return (
    <Box>
      <Tabs>
        <TabList>
          {TAB_TITLES.map((tab, id) => {
            return (
              <Tab
                key={id}
                outline="none !important"
                _focus={{ boxShadow: "none" }}
                px={[2, 2, 4, 8]}
                color="#B5B5B5"
                _selected={{
                  borderBottomColor: tab.selected,
                  color: tab.selected,
                  borderBottom: `4px solid ${tab.selected}`,
                  fontWeight: "bold",
                }}
              >
                <Flex alignItems="center">
                  <Text
                    fontSize={["xs", "sm", "md"]}
                    padding={["", "", "", "0 10px"]}
                  >
                    {tab.name}
                  </Text>
                  {tab.name === "Appointments" ? (
                    <Circle
                      width="30px"
                      fontSize={".7em"}
                      bg={"#352848"}
                      color="#fff"
                    >
                      {appointmentNotifications?.length}
                    </Circle>
                  ) : (
                    <Circle
                      width="30px"
                      fontSize={".7em"}
                      bg={"#352848"}
                      color="#fff"
                    >
                      {allNotifications?.length}
                    </Circle>
                  )}
                </Flex>
              </Tab>
            );
          })}
        </TabList>

        <TabPanels py={4}>
          <TabPanel>
            <NotificationList data={allNotifications} setRefresh={setRefresh} />
          </TabPanel>

          <TabPanel>
            <NotificationList
              data={appointmentNotifications}
              setRefresh={setRefresh}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
