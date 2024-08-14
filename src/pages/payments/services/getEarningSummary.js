import http, { AUTH_ROUTES } from "../../../services/api";
import { getFilterString } from "../../../services/mixin";

export const getEarningSummary = async (
  doctorId,
  month,
  year,
  setEarningSummary,
  setLoading
) => {
  try {
    const result = await http.get(
      AUTH_ROUTES.GET_EARNING_SUMMARY(doctorId, month, year)
    );
    setEarningSummary(result?.data?.analytics?.data);
    setLoading(false);
  } catch (e) {
    setLoading(false);
  }
};

export const getPayoutSummary = async (
  doctorId,
  month,
  year,
  setEarningSummary,
  setLoading
) => {
  try {
    const result = await http.get(
      AUTH_ROUTES.GET_PAYOUT_SUMMARY(doctorId, month, year)
    );
    setEarningSummary(result?.data?.analytics?.data);
    setLoading(false);
  } catch (e) {
    setLoading(false);
  }
};

export const getEarningReport = async (filter) => {
  let filterString = getFilterString(filter);
  const result = await http.get(AUTH_ROUTES.GET_EARNING_REPORT(filterString));
  return result?.data?.analytics?.data;
};

export const getAverageDailyEarning = async (doctorId) => {
  const result = await http.get(
    AUTH_ROUTES.GET_AVERAGE_DAILY_EARNING(doctorId)
  );
  return result?.data?.analytics?.data;
};

export const getAverageMonthlyEarning = async (doctorId) => {
  const result = await http.get(
    AUTH_ROUTES.GET_AVERAGE_MONTHLY_EARNING(doctorId)
  );
  return result?.data?.analytics?.data;
};
export const getAverageWeeklyEarning = async (doctorId) => {
  const result = await http.get(
    AUTH_ROUTES.GET_AVERAGE_WEEKLY_EARNING(doctorId)
  );
  return result?.data?.analytics?.data;
};
