import { Flex } from "@chakra-ui/react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
// import { isBefore, g } from "date-fns"

const CustomCalendar = ({
  customRender = null,
  dayHeight = "auto",
  dayBorder = "none",
  textAlign = "center",
  monthPadding = null,
  fontWeight = "500",
  todayStyles = null,
  handleChange,
  blocked,
  ...props
}) => {
  //   const disabled = []
  //   function getYesterdayDate() {
  //     const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  //   return disabled.push(yesterday);
  // }
  // getYesterdayDate();

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

            "&.past": {
              cursor: "initial !important",
              pointerEvents: "none",
            },
          },
          ".rdrDayToday .rdrDayNumber": {
            "& span": {
              zIndex: 1,
              color: "#fff",
              "&::after": todayStyles,
            },
          },
        },
      }}
      {...props}
    >
      <Calendar
        dragSelectionEnabled={false}
        showMonthAndYearPickers={false}
        dayContentRenderer={customRender}
        showPreview={false}
        onChange={handleChange}
        // disabledDates={[new Date(), new Date(blocked)]}
        // date={new Date() > Date.now()}
        // disabledDates={disabled}
      />
    </Flex>
  );
};

export default CustomCalendar;
