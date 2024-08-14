import {
  errorNotifier,
  successNotifier,
} from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const updateBookings = async (bookingId, payload, setLoading) => {
  try {
    // const {
    //   data: { result },
    // }
    const result = await http.put(
      AUTH_ROUTES.UPDATE_BOOKINGS(bookingId),
      payload
    );
    successNotifier("Booking successfully updated");
    setLoading && setLoading(false);
  } catch (e) {
    setLoading && setLoading(false);
    errorNotifier(e?.response?.data?.message);
  }
};

export const initChat = async (data) => {
  const response = await http.post(AUTH_ROUTES.INITIATE_CONVERSATION, data);
  return response.data;
};
