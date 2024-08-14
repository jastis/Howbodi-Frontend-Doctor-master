import {
  errorNotifier,
  successNotifier,
} from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const transferPatient = async (
  doctorId,
  patientId,
  setLoading,
  refresh,
  onClose
) => {
  try {
    await http.put(AUTH_ROUTES.TRANSFER_BOOKINGS(doctorId, patientId));
    successNotifier("Patient successfully transferred");
    setLoading(false);
    onClose();
    refresh();
    window.location.reload();
  } catch (e) {
    setLoading(false);
    errorNotifier(e?.response?.data?.data);
  }
};
