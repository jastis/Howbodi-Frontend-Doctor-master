import { errorNotifier } from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const getDoctorInfo = async (
  doctorId,
  setDoctorInfo,
  setAvailability
) => {
  try {
    const result = await http.get(AUTH_ROUTES.GET_DOCTOR_INFORMATION(doctorId));
    const {
      data: {
        doctorDetails: {
          data: { doctors },
        },
      },
    } = result || {};

    setDoctorInfo && setDoctorInfo(...doctors);
    setAvailability && setAvailability(doctors?.[0]?.available);
  } catch (e) {
    return null;
  }
};

export const updateAvailability = async (
  doctorId,
  payload,
  setAvailability
) => {
  try {
    await http.put(AUTH_ROUTES.UPDATE_AVAILABILITY(doctorId), payload);
    setAvailability(true);
  } catch (e) {
    return null;
  }
};
export const updateAvailability2 = async (doctorId, payload) => {
  return await http.put(AUTH_ROUTES.UPDATE_AVAILABILITY(doctorId), payload);
};

export const updateDoctorAvailability = async (
  doctorId,
  payload,
  setLoading = null
) => {
  try {
    await http.put(AUTH_ROUTES.UPDATE_AVAILABILITY(doctorId), payload);
    setLoading && setLoading(false);
  } catch (e) {
    setLoading && setLoading(false);
    return null;
  }
};
export const updatePassword = async (payload, setLoading) => {
  try {
    await http.put(AUTH_ROUTES.UPDATE_PASSWORD, payload);
    setLoading(false);
    sessionStorage.removeItem("HB#221#");
    window.location.href = "/";
  } catch (e) {
    errorNotifier(e?.response?.data?.data);
    setLoading(false);
  }
};
