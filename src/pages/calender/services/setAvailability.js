import {
  errorNotifier,
  successNotifier,
} from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const setAvailability = async (
  payload,
  onClose,
  setLoading,
  refresh
) => {
  try {
    // const {
    //   data: { result },
    // }
    await http.post(AUTH_ROUTES.SET_AVAILABILITY, payload);
    successNotifier("Availability successfully updated");
    setLoading && setLoading(false);
    onClose && onClose();
    refresh && refresh();
    //   setLoading(false)
  } catch (e) {
    //   setLoading(false);
    setLoading && setLoading(false);
    errorNotifier(e.response?.data?.data);
  }
};
