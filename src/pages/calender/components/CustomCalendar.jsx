import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import dayjs from "dayjs";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { getPendingPatients } from "../services";
import { useState } from "react";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";

const CustomCalendar = ({
  setAvailabilityButtonModal,
  requestApprovalButton,
  customRender = null,
  dayHeight = "auto",
  dayBorder = "none",
  textAlign = "center",
  monthPadding = null,
  fontWeight = "500",
  todayStyles = null,
  handleChange,
  setActiveMonthsIndex,

  ...props
}) => {
  const { docId } = useSelector((state) => state.auth);
  const [pendingRequest, setPendingRequest] = useState(0);

  //wait for x seconds, before sending request
  const getRequestApprovalTotal = debounce((month, year) => {
    setActiveMonthsIndex(Number(month) - 1);

    getPendingPatients(month, year, docId).then((res) => {
      setPendingRequest(res?.data?.schedules?.data?.totalSchedule);
    });
  }, 1000);

  const func = (focusedDate, changeShownDate, props) => {
    const { showMonthArrow } = props || {};
    getRequestApprovalTotal(
      Number(dayjs(focusedDate).format("M")),
      Number(dayjs(focusedDate).format("YYYY"))
    );

    return (
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
        onMouseUp={(e) => e.stopPropagation()}
        mb="30px"
      >
        <Stack
          direction="row"
          alignItems={"center"}
          fontSize="1.5em"
          color="grey"
        >
          <Text
            fontSize="1em"
            border="1px solid #b69edd"
            color="#5C2BA8"
            borderRadius={"5px"}
            bg="#EEE4FE"
            p="5px 20px"
            cursor="pointer"
            onClick={() => changeShownDate(new Date())}
          >
            Today
          </Text>
          {showMonthArrow ? (
            <button
              type="button"
              onClick={() => {
                changeShownDate(-1, "monthOffset");
              }}
            >
              <MdOutlineKeyboardArrowLeft fontSize="2em" />
            </button>
          ) : null}
          <Text>
            {dayjs()
              .month(Number(focusedDate?.getMonth?.()))
              .year(Number(focusedDate.getFullYear()))
              .format("MMMM YYYY")}
          </Text>

          {showMonthArrow ? (
            <button
              type="button"
              onClick={() => {
                changeShownDate(+1, "monthOffset");
              }}
            >
              <MdOutlineKeyboardArrowRight fontSize="2em" />
            </button>
          ) : null}
        </Stack>

        <Stack direction="row" alignItems={"center"} spacing="20px">
          <Box position={"relative"}>
            <Box
              width="20px"
              height="20px"
              borderRadius={"50%"}
              position="absolute"
              background="#F79256"
              zIndex={"999"}
              color="#fff"
              fontWeight="bold"
              display="flex"
              justifyContent="center"
              top="-10px"
            >
              {pendingRequest}
            </Box>

            {requestApprovalButton}
          </Box>

          {setAvailabilityButtonModal}
        </Stack>
      </Stack>
    );
  };

  return (
    <Flex
      sx={{
        "&": {
          justifyContent: "center",
          " p": {
            lineHeight: "initial",
          },
          ".rdrWeekDay": {
            textAlign: textAlign,
          },
          ".rdrCalendarWrapper": {
            flexGrow: 1,
            borderRadius: "1rem",
          },
          ".rdrMonthAndYearWrapper": {
            justifyContent: "flex-end",
            padding: "0 1rem",
            margin: "1rem 0",
          },
          ".rdrMonthAndYearPickers": {
            justifyContent: "flex-start",
            order: -1,
            color: "grey",
            fontSize: "1.5rem",
          },
          ".rdrCalendarWrapper:not(.rdrDateRangeWrapper) .rdrDayHovered .rdrDayNumber:after, .rdrDayStartPreview.rdrDayEndPreview":
            {
              border: "none",
              background: "#614285",
              color: "#fff",
              zIndex: -100,
            },
          ".rdrMonth": {
            width: "100%",
            padding: monthPadding,
          },

          "button.rdrDay": {
            height: dayHeight,
            border: dayBorder,
            position: "relative",
          },

          ".rdrNextPrevButton": {
            margin: "0 0.2rem",
            background: "transparent",
            border: "1px solid rgba(243 243 243/ 1)",
          },
          ".rdrDayNumber": {
            alignItems: "flex-start",
            justifyContent: "center",
            fontWeight: fontWeight,
            position: "static",
            height: "inherit",
            color: "green",

            "&.past": {
              cursor: "initial !important",
              pointerEvents: "none",
            },
          },
          ".rdrDayToday .rdrDayNumber": {
            "& span": {
              zIndex: 1,
              color: "#fff",
              background: "green",
              width: "50%",
              height: "40%",
              borderRadius: "50%",
              "&::after": todayStyles,
            },
          },
        },
      }}
      {...props}
    >
      <Calendar
        navigatorRenderer={func}
        dragSelectionEnabled={false}
        showMonthAndYearPickers={false}
        dayContentRenderer={customRender}
        showPreview={false}
        onChange={handleChange}
      />
    </Flex>
  );
};

export default CustomCalendar;
