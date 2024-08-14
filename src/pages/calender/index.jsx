import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCalendarCheck } from "react-icons/bi";
import CustomModal from "../../components/CustomModal";
import CustomCalendar from "./components/CustomCalendar";
import SetAvailability from "./components/SetAvailability";
import { useSelector } from "react-redux";
import { getDate } from "date-fns";
import dayjs from "dayjs";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { Schedules } from "./components/Schedules";
import { getSchedules } from "./services/getSchedules";
import { getDoctors } from "./services/getDoctors";
import FullPageLoader from "../../components/fullPageLoader";
import { allMonths } from "../../app/constants";
import ListScheduleDetailsModal from "./components/ListScheduleDetailsModal";
import { useLocation } from "react-router-dom";
import { getDoctorInfo } from "../profile/service";
import { RequestApprovalBtn } from "./components/RequestApprovalBtn";

const Calender = () => {
  const { docId } = useSelector((state) => state.auth);
  const location = useLocation();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [activeMonthIndex, setActiveMonthsIndex] = useState(
    location?.state?.date
      ? Number(dayjs(location?.state?.date).format("M")) - 1
      : Number(dayjs().format("M")) - 1
  );
  const [activeDayIndex] = useState(
    location?.state?.date
      ? Number(dayjs(location?.state?.date).format("D"))
      : Number(dayjs().format("D"))
  );
  const [choosenMonth, setChoosenMonth] = useState(
    location?.state?.date
      ? dayjs(location?.state?.date).format("MMM")
      : dayjs().format("MMM")
  );

  const [getAllDateScheduleLoader, setGetAllDateScheduleLoader] =
    useState(false);
  const [showAllDateScheduleModal, setShowAllDateScheduleModal] =
    useState(false);
  const [allDateScheduleResult, setAllDateScheduleResult] = useState([]);

  const [doctorInfo, setDoctorInfo] = useState({});
  useEffect(() => {
    getDoctorInfo(docId, setDoctorInfo);
  }, [docId]);

  const availability = doctorInfo?.availability?.map(
    (item) => new Date(item.startDate)
  );

  useEffect(() => {
    getDoctors(setDoctors, setLoading);
  }, [refresh, docId]);

  const TAB_TITLES = [
    { name: "Availablility", selected: "#09B5A9" },
    { name: "Schedules", selected: "#09B5A9" },
  ];
  const customRender = (date) => {
    const newDate = availability?.some(
      (item) =>
        dayjs(date).format("DD-MM-YYYY") === dayjs(item).format("DD-MM-YYYY")
    );
    return (
      <Box fontSize={"1.5em"}>
        {newDate ? (
          <Box
            p="5px 15px"
            borderRadius={"10px"}
            bg="#8c78ab !important"
            color="#fff"
            fontWeight="bold"
          >
            {getDate(date)}
          </Box>
        ) : (
          <span style={{ color: "#929292" }}>{getDate(date)}</span>
        )}
      </Box>
    );
  };

  const overrideStyle = `
  .rdrCalendarWrapper {
    background: #f6f4f9 !important; 

}
.rdrDayToday .rdrDayNumber span:after {
    content: '';
    position: ;
    bottom: 4px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 18px;
    height: 2px;
    border-radius: 2px;
    background: transparent !important;
}
.css-1p8llhr .rdrDayToday .rdrDayNumber span {
    background: none;
  color: #1d2429;
}
.css-1p8llhr button.rdrDay {
    border: 1px solid #EEE4FE;
}
.rdrWeekDay {
  border: 1px solid #EEE4FE;
}
`;

  //get all schedules with the date parameter
  const getAllDateSchedule = (res) => {
    if (!res) return;
    setShowAllDateScheduleModal(true);
    setGetAllDateScheduleLoader(true);
    const formatDate = dayjs(res).format("YYYY-MM-DD");
    getSchedules(docId, formatDate)
      .then((result) => {
        setAllDateScheduleResult(result);
        setGetAllDateScheduleLoader(false);
      })
      .catch((err) => {
        setGetAllDateScheduleLoader(false);
      });
  };

  const [tabIndex, setTabIndex] = useState(location?.state?.tab || 0);
  const handleTabsChange = (index) => {
    setTabIndex(index);
  };
  return loading ? (
    <FullPageLoader />
  ) : (
    <>
      <Flex width={"100%"} mx="auto" direction="column">
        <Flex
          bg="#F6F4F9"
          borderRadius="1rem"
          direction="column"
          mb={4}
          px={[2, 2, 4, 8]}
          py={4}
        >
          <Tabs
            isLazy
            index={tabIndex}
            onChange={handleTabsChange}
            // defaultIndex={location?.state?.tab || 0}
          >
            <TabList>
              {TAB_TITLES?.map((tab, id) => {
                return (
                  <Tab
                    key={id}
                    outline="none !important"
                    _focus={{ boxShadow: "none" }}
                    px={[2, 2, 4, 8]}
                    color="#B5B5B5"
                    _selected={{
                      borderBottomColor: tab.selected,
                      color: "#5C2BA8",
                      borderBottom: `3px solid ${tab.selected}`,
                      borderWidth: "3px",
                    }}
                  >
                    <Flex alignItems="center">
                      <Text
                        fontSize={["xs", "sm", "md"]}
                        padding={["", "", "", "0 10px"]}
                      >
                        {tab?.name}
                      </Text>
                    </Flex>
                  </Tab>
                );
              })}
            </TabList>

            <TabPanels py={4}>
              <TabPanel>
                <Flex alignItems="center" justify="space-between">
                  <Flex alignItems={"center"}></Flex>
                </Flex>
                <Flex
                  direction="column"
                  bg="transparent"
                  pt={4}
                  borderTopRadius="1rem"
                >
                  <style>{overrideStyle}</style>

                  <CustomCalendar
                    setActiveMonthsIndex={(index) => {
                      setActiveMonthsIndex(index);
                      const month = allMonths?.[index];
                      setChoosenMonth(month);
                    }}
                    requestApprovalButton={
                      <RequestApprovalBtn goToScheduleTab={setTabIndex} />
                    }
                    setAvailabilityButtonModal={
                      <CustomModal
                        color="#403058"
                        btnIcon={<BiCalendarCheck size="1rem" />}
                        btnTitle="Availablilty"
                        _focus={{ boxShadow: "none" }}
                        background="#fff"
                        _hover={{ background: "#fff" }}
                        leftIcon={<AiOutlinePlus size="1rem" />}
                        buttonProps={{
                          background: `#5C2BA8`,
                          color: "#5C2BA8",
                          padding: "1rem",
                          mr: 2,
                        }}
                        lgModal="3xl"
                        title="Set Availability"
                      >
                        <SetAvailability
                          refresh={() => {
                            document.location.reload(true);
                          }}
                        />
                      </CustomModal>
                    }
                    customRender={customRender}
                    dayHeight="6rem"
                    dayBorder="1px solid rgba(243 243 243/ 0.5)"
                    mt={2}
                    marginLeft={"20px"}
                    handleChange={(res) => getAllDateSchedule(res)}
                  />
                  <ListScheduleDetailsModal
                    showAllDateScheduleModal={showAllDateScheduleModal}
                    setShowAllDateScheduleModal={setShowAllDateScheduleModal}
                    getAllDateScheduleLoader={getAllDateScheduleLoader}
                    allDateScheduleResult={allDateScheduleResult}
                  />
                </Flex>
              </TabPanel>

              <TabPanel>
                <Flex justify="space-between">
                  <Box>
                    <Text
                      fontSize="1.5em"
                      fontWeight="bold"
                      color="blackAlpha.700"
                      mb="25px"
                    >
                      My Schedules
                    </Text>
                  </Box>
                  <Flex>
                    <Flex
                      p="5px"
                      bg="#EFEDF3"
                      color="#707070"
                      alignItems={"center"}
                      height="40px"
                    >
                      <BsChevronLeft
                        onClick={() => {
                          const r = allMonths?.[activeMonthIndex - 1];

                          if (!r) return;
                          setActiveMonthsIndex((prev) => prev - 1);
                          setChoosenMonth(r);
                        }}
                        cursor={"pointer"}
                      />
                    </Flex>
                    <Flex
                      alignItems={"center"}
                      p="5px 10px"
                      height="40px"
                      bg="#EFEDF3"
                      color="#5C2BA8"
                      fontWeight={"bold"}
                      fontSize="1.2em"
                      // borderRadius={"5px"}
                      mx="5px"
                    >
                      <Text> {allMonths?.[activeMonthIndex]}</Text>
                    </Flex>
                    <Flex
                      p="5px"
                      bg="#EFEDF3"
                      color="#707070"
                      alignItems={"center"}
                      // borderRadius={"5px"}
                      height="40px"
                    >
                      <BsChevronRight
                        onClick={() => {
                          const r = allMonths?.[activeMonthIndex + 1];
                          if (!r) return;
                          setActiveMonthsIndex((prev) => prev + 1);
                          setChoosenMonth(r);
                        }}
                        cursor={"pointer"}
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Schedules
                  availability={doctorInfo?.availability}
                  activeMonthIndex={activeMonthIndex}
                  activeDayIndex={activeDayIndex}
                  choosenMonth={choosenMonth}
                  doctors={doctors}
                  setRefresh={() => setRefresh({})}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
};

export default Calender;
