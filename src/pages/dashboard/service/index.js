import http, { AUTH_ROUTES } from "../../../services/api";

export const getTotalSchedules = async (doctorId, setTotalSchedules) => {
  try {
    const result = await http.get(AUTH_ROUTES.GET_TOTAL_SCHEDULES(doctorId));
    setTotalSchedules(result?.data?.schedules?.data?.totalSchedule);
  } catch (e) {
    return null;
  }
};
