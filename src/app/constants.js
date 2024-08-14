/**
 * Paths available to users who are not logged in
 * @constant
 */
export const PUBLIC_PATHS = {
  LANDING: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
};

/**
 * Paths available to users who are  logged in
 * @constant
 */
export const PROTECTED_PATHS = {
  DASHBOARD: "/dashboard",
  PAYMENTS: "/payments",
  CALENDAR: "/calendar",
  DOCTORS: "/doctors",
  NOTIFICATIONS: "/notifications",
  PATIENTS: "/patients",
  PROFILE: "/profile",
  CHATS: "/chats",
};

export const DATA_ROWS = {
  LIMIT: 20,
};

export const FREE_BOOKING_END_MINUTE = 30;
export const FREE_BOOKING_TIMER_IN_SECONDS = 30 * 60000;

export const BOOKING_END_MINUTE = 30;
export const BOOKING_TIMER_IN_SECONDS = 30 * 60000; //BOOKING_END_MINUTE in miliseconds
//one minute in miliseconds is 60000

export const TRACK_AVAILABILITY_TIMER = 3600; // 1 HOUR IN SECONDS
export const AUTOMATICALLY_TURN_OFF_TRACK_AVAILABILITY_TIMER_IF_NO_OPTION_CLICKED = 30;

export const allMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const ALL_MONTHS = [
  {
    value: 1,
    name: "Jan",
  },
  {
    value: 2,
    name: "Feb",
  },
  {
    value: 3,
    name: "March",
  },
  {
    value: 4,
    name: "April",
  },
  {
    value: 5,
    name: "May",
  },
  {
    value: 6,
    name: "Jun",
  },
  {
    value: 7,
    name: "Jul",
  },
  {
    value: 8,
    name: "Aug",
  },
  {
    value: 9,
    name: "Sep",
  },
  {
    value: 10,
    name: "Oct",
  },
  {
    value: 11,
    name: "Nov",
  },
  {
    value: 12,
    name: "Dec",
  },
];
