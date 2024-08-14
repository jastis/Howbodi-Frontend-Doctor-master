import { DtCalendar } from "react-calendar-datetime-picker";

import "react-calendar-datetime-picker/dist/index.css";

export const CalendarDatePicker = ({ setDate, ...props }) => {
  const nowDate = new Date();
  const minDate = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    day: nowDate.getDate(),
  };

  const overrideStyle = `
 
.react-calendar-datetime-picker .daysList .is-disabled {
  color: #aebfa9 !important;
}
.react-calendar-datetime-picker .daysList .is-week-days {
  color: #aaa !important;
}
.react-calendar-datetime-picker .daysList .daysList-day {
  color: #000 !important;
  font-size: 0.7em !important;
  font-weight: bold !important;
}
.react-calendar-datetime-picker .header {
  background-color: #fff !important;
}
.react-calendar-datetime-picker .calender-modal {
  box-shadow: none !important;
}
.react-calendar-datetime-picker .calender-modal {
  background-color: #fff !important;
}
.react-calendar-datetime-picker .header .header--btn {
  color: #000 !important;
}
.react-calendar-datetime-picker .header {
  background-color: #f8f8f8 !important;
  padding: 0.7rem 1rem !important;
}
.react-calendar-datetime-picker .header .header--btn {
  color: #1a1a1a !important;
}
 .react-calendar-datetime-picker .header .header-date {
     color: #5C2BA8 !important; 
     font-weight: bold
   }
  .react-calendar-datetime-picker .daysList .is-selected-day {
    background-color:  #5C2BA8 !important;
    color: #fff !important
  }
.react-calendar-datetime-picker .daysList .is-today {
    box-shadow: none !important;
}
.react-calendar-datetime-picker .monthList_month.is-selected-month {
  color: #5C2BA8 !important;
}
.react-calendar-datetime-picker .daysList .daysList-day {
    width: calc(100% / 10) !important;
    height: calc(310px / 10) !important;
    line-height: calc(310px / 7) !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 5px !important;
`;
  return (
    <>
      <style>{overrideStyle}</style>
      <DtCalendar {...props} minDate={minDate} onChange={(e) => setDate(e)} />
    </>
  );
};
