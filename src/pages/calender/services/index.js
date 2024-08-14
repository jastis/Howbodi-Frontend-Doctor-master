import http, { AUTH_ROUTES } from "../../../services/api";
import { successNotifier } from "../../../components/NotificationHandler";

export const reschedulePatientBooking = async ({
  bookingId,
  doctorId,
  startDate,
  endDate,
  setLoading,
  onClose,
  refresh,
}) => {
  try {
    await http.put(AUTH_ROUTES.RESCHEDULE_BOOKING(bookingId), {
      doctorId,
      startDate,
      endDate,
    });
    setLoading(false);
    successNotifier("Successfully rescheduled");
    onClose();
    refresh();
    window.location.reload();
  } catch (e) {
    setLoading(false);
  }
};

export const updateActivity = (activityId, formData) => {
  return http.put(AUTH_ROUTES.UPDATE_ACTIVITY(activityId), formData);
};

export const getPendingPatients = (month, year, doctorId) => {
  const res = http.get(
    AUTH_ROUTES.GET_PENDING_PATIENTS({ month, year, doctorId })
  );
  return res;
};

export const initiateChat = (bookingId) => {
  return http.post(AUTH_ROUTES.INITIATE_CHAT, { bookingId });
};

export const getScheduleDates = async (
  setScheduledDates,
  doctorId,
  date,
  setScheduledDatesLoader
) => {
  try {
    const res = await http.get(AUTH_ROUTES.GET_SCHEDULED_DATES(doctorId, date));
    const allBookedDates = res?.data?.schedules?.data?.schedules?.map(
      (data) => data?.startDate
    );
    setScheduledDates(allBookedDates);
    setScheduledDatesLoader && setScheduledDatesLoader(false);
  } catch (e) {
    setScheduledDates([]);
    setScheduledDatesLoader && setScheduledDatesLoader(false);
  }
};

// export const deleteActivity = (activityId, staffId, companyCode) => {
//   return http.delete(
//     AUTH_ROUTES.DELETE_ACTIVITY(activityId, staffId, companyCode)
//   )
// }

// export const setAvailability = async (
//   setLoading,
//   staffId,
//   payload,
//   onClose
// ) => {
//   try {
//     await http.put(AUTH_ROUTES.SET_AVAILABILITY({ staffId }), payload)
//     setLoading(false)
//     successNotifier("Successfully updated.")
//     onClose()
//   } catch (e) {
//     setLoading(false)
//   }
// }
