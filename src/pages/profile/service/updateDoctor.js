import { errorNotifier } from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const updateDoctor = async (docId, payload, setLoading) => {
  try {
    setLoading(true);
    const {
      data: { doctor },
    } = await http.put(AUTH_ROUTES.UPDATE_DOCTOR(docId), payload);
    window.location.reload();
    setLoading(false);
  } catch (e) {
    errorNotifier(e.response?.data);
    setLoading(false);
  }
};
