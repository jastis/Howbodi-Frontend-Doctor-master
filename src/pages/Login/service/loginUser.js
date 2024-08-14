import { errorNotifier } from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const loginUser = async (payload, setLoading) => {
  try {
    const result = await http.post(AUTH_ROUTES.LOGIN, payload);
    const token = result?.data?.doctor?.message?.token;
    console.log(result);
    if (token) {
      sessionStorage.setItem("HB#221#", token);
      window.location.reload();
    }
  } catch (e) {
    setLoading(false);
    errorNotifier(e?.response?.data?.data);
  }
};
