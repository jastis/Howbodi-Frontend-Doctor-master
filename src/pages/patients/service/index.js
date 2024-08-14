import { DATA_ROWS } from "../../../app/constants";
import http, { AUTH_ROUTES } from "../../../services/api";

export const getPatients = async (
  doctorId,
  skip = 0,
  limit = DATA_ROWS.LIMIT
) => {
  const page = limit * skip;
  const params = {
    skip: page,
    limit,
    doctorId,
  };
  const result = await http.get(AUTH_ROUTES.GET_PATIENTS(params));
  return result.data?.patients?.data;
};

export const searchUser = async (searchTerm, setFilteredUsers, doctorId) => {
  try {
    const { data } = await http.get(
      AUTH_ROUTES.DOCTOR_SEARCH_USER(searchTerm, doctorId)
    );
    setFilteredUsers(data?.search?.data);
  } catch (err) {
    setFilteredUsers([]);
  }
};
