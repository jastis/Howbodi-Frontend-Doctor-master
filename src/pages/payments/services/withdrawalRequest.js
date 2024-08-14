import {
  errorNotifier,
  successNotifier,
} from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const withdrawalRequest = async (payload, onClose, setLoading) => {
  try {
    await http.post(AUTH_ROUTES.WITHDRAWAL_REQUEST, payload);
    successNotifier("Withdrawal successfully created");
    setLoading(false);
    onClose();
  } catch (e) {
    setLoading(false);
    errorNotifier(e.response?.data?.data);
  }
};
