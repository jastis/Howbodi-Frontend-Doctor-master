import { DATA_ROWS } from "../../../app/constants";
import http, { AUTH_ROUTES } from "../../../services/api";

export const getEarnings = async (
  doctorId,
  setEarnings,
  setLoading,
  setTotalEarning,
  skip = 0,
  limit = DATA_ROWS.LIMIT
) => {
  const page = limit * skip;
  const params = {
    skip: page,
    limit,
    doctorId,
  };
  try {
    const result = await http.get(AUTH_ROUTES.GET_EARNINGS(params));
    setEarnings && setEarnings(result?.data?.withdrawal?.data?.earnings);
    setTotalEarning &&
      setTotalEarning(result?.data?.withdrawal?.data?.totalEarnings);
    setLoading && setLoading(false);
  } catch (e) {
    setLoading(false);
  }
};
