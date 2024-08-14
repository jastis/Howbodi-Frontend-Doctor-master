import { PROTECTED_PATHS } from "../../../../app/constants";
// import { ImStack } from "react-icons/im";
import { MdOutlineDashboard } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { BsCalendar2Minus, BsBell } from "react-icons/bs";
import { RiWaterFlashLine } from "react-icons/ri";
import { IoChatbubblesOutline } from "react-icons/io5";

const { DASHBOARD, PATIENTS, PAYMENTS, NOTIFICATIONS, CALENDAR, CHATS } =
  PROTECTED_PATHS;

export const ADMIN_NAV_ITEMS = [
  {
    title: "Dashboard",
    to: DASHBOARD,
    icon: MdOutlineDashboard,
  },
  {
    title: "Payments",
    to: PAYMENTS,
    icon: RiWaterFlashLine,
  },
  {
    title: "Calendar",
    to: CALENDAR,
    icon: BsCalendar2Minus,
  },
  {
    title: "Chats",
    to: CHATS,
    icon: IoChatbubblesOutline,
  },

  {
    title: "Patients",
    to: PATIENTS,
    icon: IoPersonOutline,
  },
  {
    title: "Notifications",
    to: NOTIFICATIONS,
    icon: BsBell,
  },
];



