import http, { AUTH_ROUTES } from "../../../services/api";

export const getDoctors = async (setDoctors, setLoading) => {
  try {
    const result = await http.get(AUTH_ROUTES.GET_DOCTORS);
    setDoctors(result?.data?.doctorDetails?.data?.doctors);
    setLoading(false);
  } catch (e) {
    setLoading(false);
    // errorNotifier(e.response?.data?.data);
  }
};
