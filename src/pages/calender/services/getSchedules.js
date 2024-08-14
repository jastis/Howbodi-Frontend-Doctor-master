import http, { AUTH_ROUTES } from "../../../services/api";
import { getFilterString } from "../../../services/mixin";

export const getSchedules = async (doctorId, date) => {
  const result = await http.get(
    AUTH_ROUTES.GET_DOCTOR_SCHEDULES(doctorId, date)
  );
  const r = result?.data?.schedules?.data?.schedules;
  return r;
};

export const getDoctorSchedules = async (filter) => {
  let filterString = getFilterString(filter);
  const result = await http.get(AUTH_ROUTES.GET_SCHEDULES(filterString));
  return result?.data?.schedules?.data;
};

export const getAllDoctorSchedules = async (filter) => {
  let filterString = getFilterString(filter);
  const result = await http.get(AUTH_ROUTES.GET_ALL_SCHEDULES(filterString));
  return result?.data?.schedules?.data;
};
