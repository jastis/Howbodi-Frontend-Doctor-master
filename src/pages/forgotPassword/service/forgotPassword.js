import {
  errorNotifier,
  successNotifier,
} from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const initiateForgotPassword = async (
  payload,
  setLoading,
  setAuthenticateCode
) => {
  try {
    const result = await http.post(AUTH_ROUTES.FORGOT_PASSWORD, payload);
    setAuthenticateCode(true);
  } catch (e) {
    setLoading(false);
    setAuthenticateCode(false);
    errorNotifier(e.response?.data?.data);
  }
};

export const authenticateCode = async (payload, setLoading, history) => {
  try {
    await http.post(AUTH_ROUTES.RESET_PASSWORD, payload);
    successNotifier("Successfully reset password");
    setLoading(false);
    history.push("/login");
  } catch (e) {
    setLoading(false);
    errorNotifier(e.response?.data?.data);
  }
};
