import {
  successNotifier,
  errorNotifier,
} from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const addPatientNote = async (setLoading, payload) => {
  setLoading(true);
  try {
    const { data } = await http.post(AUTH_ROUTES.ADD_PATIENT_NOTE, payload);
    successNotifier(data?.patient?.message);
  } catch (err) {
    errorNotifier(err.response.data.message);
  } finally {
    setLoading(false);
  }
};
