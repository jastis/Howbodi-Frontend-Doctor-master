import {
  errorNotifier,
  successNotifier,
} from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const rescheduleBooking = async (bookingId, payload) => {
  try {
    // const {
    //   data: { result },
    // }
    const result = await http.put(
      AUTH_ROUTES.RESCHEDULE_BOOKING(bookingId),
      payload
    );
    successNotifier("Booking successfully rescheduled");
  } catch (e) {
    errorNotifier(e.response?.data?.data);
  }
};
