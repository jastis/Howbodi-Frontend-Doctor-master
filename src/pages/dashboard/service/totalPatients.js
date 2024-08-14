//import { errorNotifier } from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

// export const totalPatients = async (doctorId, setLoading, setUsers) => {
//   try {
//     const result = await http.get(AUTH_ROUTES.GET_TOTAL_USER);
//    // setPatients(result?.data?.users?.data?.user);
//   } catch (e) {
//     setLoading(false);
//     errorNotifier(e.response?.data?.data);
//   }
// };
// export const totalPatients = async () => {
//   const result = await http.get(AUTH_ROUTES.GET_TOTAL_USER());
//   return result?.data?.userDetails?.data?.totalUsers;
// };

export const getTotalPatients = async (doctorId, setTotalEarning) => {
  try {
    //total patient attended to
    const result = await http.get(AUTH_ROUTES.GET_TOTAL_PATIENT(doctorId));
    setTotalEarning(result?.data?.withdrawal?.data?.totalEarnings);
  } catch (e) {
    return null;
  }
};
