import http, { AUTH_ROUTES } from "../services/api";
// import { errorNotifier } from "../components/NotificationHandler";

export const getUserProfile = async (docId, setUserProfile, setLoading) => {
  try {
    const data = await http.get(AUTH_ROUTES.GET_USER(docId));
    setUserProfile(data?.data?.doctorDetails?.data?.doctors);
    setLoading(false);
    return data;
  } catch (e) {
    setLoading(false);
    // errorNotifier(e.response?.data?.result?.message);
  }
};
