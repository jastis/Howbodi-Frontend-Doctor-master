import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allMonths } from "../../../app/constants";
import { getAllDoctorSchedules, getSchedules } from "../services/getSchedules";
import { DateCard } from "./DateCard";
import { ScheduleDetails } from "./ScheduleDetails";
import { useLocation } from "react-router-dom";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export const Schedules = ({
  choosenMonth,
  activeMonthIndex,
  activeDayIndex,
  doctors,
  setRefresh,
  availability,
}) => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(
    location?.state?.date
      ? Number(dayjs(location?.state?.date).format("D"))
      : Number(dayjs().date(activeDayIndex).format("D"))
  );
  const { docId } = useSelector((state) => state.auth);

  const [scheduleResult, setScheduleResult] = useState([]);
  const [clickedDate, setClickedDate] = useState(
    location?.state?.date ? dayjs(location?.state?.date).format("DD") : ""
  );

  function getAllDaysInMonth(year, month) {
    const date = new Date(year, month, 1);

    const dates = [];

    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }
  const getCurrentDate = new Date(
    dayjs().month(activeMonthIndex).format("YYYY-MM-DD")
  ); // current date

  const [loading, setLoading] = useState(false);

  const getSchedule = (date) => {
    const getMonthIndex = allMonths.findIndex(
      (month) => month === choosenMonth
    );

    const getDate = dayjs()
      .month(getMonthIndex)
      .date(date)
      .format("YYYY-MM-DD");

    setLoading(true);
    getSchedules(docId, getDate)
      .then((res) => {
        setLoading(false);
        setScheduleResult(res);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const [onFirstMount, setOnFirstMount] = useState(true);

  //call the getSchedule func, when it first mount, to get current date schedules
  useEffect(() => {
    if (!onFirstMount) return;
    const date = dayjs()
      .date(activeDayIndex)
      .month(activeMonthIndex)
      .format("DD");
    getSchedule(date);
    setOnFirstMount(false);
    //eslint-disable-next-line
  }, [choosenMonth, onFirstMount, activeMonthIndex]);

  const filter = { doctorId: docId };
  const [datesWithSchedules, setDatesWithSchedules] = useState([]);

  //get all doctors schedules, to be highlighted on the calendar
  useEffect(() => {
    getAllDoctorSchedules(filter)
      .then((res) => {
        setDatesWithSchedules(
          res?.schedules
            ?.filter(
              (data) =>
                data?.status === "PENDING" || data?.status === "APPROVED"
            )
            ?.map((data) => dayjs(data?.startDate).format("YYYY-MM-DD"))
        );
      })
      .catch(() => null);
    //eslint-disable-next-line
  }, [choosenMonth]);

  useEffect(() => {
    scrollToStart();
    //eslint-disable-next-line
  }, [activeIndex]);

  const apiRef = React.useRef({});
  const scrollToStart = () => {
    apiRef?.current?.scrollToItem(
      apiRef?.current.getItemByIndex(activeIndex - 1),
      "smooth",
      "start"
    );
  };
  useEffect(() => {
    scrollToStart();
    //eslint-disable-next-line
  }, [activeIndex, apiRef?.current]);

  const overideStyle = `.react-horizontal-scrolling-menu--arrow-left, 
  .react-horizontal-scrolling-menu--arrow-right {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.react-horizontal-scrolling-menu--scroll-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
`;

  return (
    <Box>
      <style>{overideStyle}</style>
      <ScrollMenu
        apiRef={apiRef}
        LeftArrow={
          <IoIosArrowBack
            cursor={"pointer"}
            onClick={() => apiRef?.current?.scrollPrev()}
          />
        }
        RightArrow={
          <IoIosArrowForward
            cursor={"pointer"}
            onClick={() => apiRef?.current?.scrollNext()}
          />
        }
      >
        {getAllDaysInMonth(
          getCurrentDate?.getFullYear(),
          getCurrentDate?.getMonth()
        ).map((data, i) => {
          let addOneToLoopIndex = i + 1;

          return (
            <DateCard
              itemId={addOneToLoopIndex}
              id={addOneToLoopIndex}
              onClick={(date) => {
                getSchedule(date);
                setClickedDate(date);
                setActiveIndex(addOneToLoopIndex);
              }}
              date={dayjs(data).format("DD")}
              day={dayjs(data).format("ddd")}
              month={dayjs(data).format("MMM")}
              color={
                activeIndex === addOneToLoopIndex
                  ? "#fff"
                  : datesWithSchedules?.includes(
                      dayjs(data).format("YYYY-MM-DD")
                    )
                  ? "#797979"
                  : "#929292"
              }
              bg={
                activeIndex === addOneToLoopIndex
                  ? "#5C2BA8"
                  : datesWithSchedules?.includes(
                      dayjs(data).format("YYYY-MM-DD")
                    )
                  ? "#5c2ba817" //hightlight dates that have schedules in them
                  : "#fff"
              }
              isActive={activeIndex === addOneToLoopIndex ? true : false}
              mr="20px"
            />
          );
        })}
      </ScrollMenu>

      <SimpleGrid
        minChildWidth="200px"
        spacing="40px"
        my="30px"
        p="30px"
        bg="#fff"
        borderRadius={"20px"}
      >
        {loading ? (
          <Text>Loading</Text>
        ) : scheduleResult?.length > 0 ? (
          scheduleResult?.map((data) => {
            return (
              <ScheduleDetails
                name={`${data?.patientId?.[0]?.firstName} ${data?.patientId?.[0]?.lastName}`}
                time={dayjs(data?.startDate).format("HH:mm a")}
                scheduledDate={data?.startDate}
                scheduleEndDate={data?.endDate}
                visitationType={data?.visitationType}
                doctors={doctors}
                schedule={data}
                status={data.status}
                bookingId={data?._id}
                setRefresh={setRefresh}
                patientId={data.patientId?.[0]?._id}
                refresh={() => {
                  window.location.reload();
                  setRefresh();
                }}
                recallGetScheduleFunction={() => getSchedule(clickedDate)}
                availability={availability}
              />
            );
          })
        ) : (
          <Text textAlign={"center"}>No schedule to available </Text>
        )}
      </SimpleGrid>
    </Box>
  );
};
