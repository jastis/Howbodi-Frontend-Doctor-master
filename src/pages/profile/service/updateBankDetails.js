import {
  errorNotifier,
  successNotifier,
} from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const updateBankDetails = async (payload, setLoading) => {
  try {
    const result = await http.post(AUTH_ROUTES.UPDATE_BANK_DETAILS, payload);
    setLoading(false);
    successNotifier("Account Information Updated Successfully");
  } catch (e) {
    errorNotifier(e.response?.data?.[0]?.msg);
    setLoading(false);
    throw new Error();
  }
};
