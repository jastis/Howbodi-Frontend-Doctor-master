// import { errorNotifier, successNotifier } from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

// export const getNotifications = async (doctorId, setNotifications, setLoading) => {
//   try {
//     // const {
//     //   data: { result },
//     // }
//     const result = await http.get(AUTH_ROUTES.GET_NOTIFICATIONS(doctorId));
// //    successNotifier("Withdrawal successfully created")
//     setNotifications(result?.data?.notifications?.data?.notifications)
//     setLoading(false)
//   } catch (e) {
//     setLoading(false);
//     // errorNotifier(e.response?.data?.data);
//   }
// };
export const getAllNotifications = async () => {
  const result = await http.get(AUTH_ROUTES.GET_ALL_NOTIFICATIONS);
  return result?.data?.notifications?.data?.notifications;
};
export const getAppointmentNotifications = async () => {
  const result = await http.get(AUTH_ROUTES.GET_APPOINTMENT_NOTIFICATIONS);
  return result?.data?.notifications?.data?.notifications;
};
