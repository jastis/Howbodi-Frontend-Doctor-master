import http, { AUTH_ROUTES } from "../../../services/api";

export const searchPatient = async (search) => {
  const res = await http.get(AUTH_ROUTES.SEARCH_CONTACT(search));
  return res?.data?.conversations?.data?.conversations;
};
