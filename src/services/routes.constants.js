export const AUTH_ROUTES = {
  LOGIN: "/doctors/login",
  FORGOT_PASSWORD: "/initiate-forgot-password",
  RESET_PASSWORD: "/reset-password",
  // ADD_USER: "/admin/add-user",
  GET_USER: (userId) => `/doctors?id=${userId}`,
  GET_USERS: `/users`,
  GET_DOCTORS: "/doctors",
  WITHDRAWAL_REQUEST: "/doctors/withdrawal",
  GET_TOTAL_PATIENT: (doctorId) => `/doctors/earnings?doctorId=${doctorId}`,
  GET_EARNINGS: ({ doctorId, skip, limit }) =>
    `/doctors/earnings?doctorId=${doctorId}&skip=${skip}&limit=${limit}`,
  GET_EARNING_SUMMARY: (doctorId, month, year) =>
    `/analytic/earning-summary?doctorId=${doctorId}&month=${month}&year=${year}`,
  GET_PAYOUT_SUMMARY: (doctorId, month, year) =>
    `/analytic/payout-summary?doctorId=${doctorId}&month=${month}&year=${year}`,
  GET_EARNING_REPORT: (filter) => `/analytic/earning-summary${filter}`,
  GET_AVERAGE_DAILY_EARNING: (doctorId) =>
    `/analytic/daily-average-earnings?doctorId=${doctorId}`,
  GET_AVERAGE_MONTHLY_EARNING: (doctorId) =>
    `/analytic/monthly-average-earnings?doctorId=${doctorId}`,
  GET_AVERAGE_WEEKLY_EARNING: (doctorId) =>
    `/analytic/weekly-average-earnings?doctorId=${doctorId}`,

  UPDATE_DOCTOR: (doctorsId) => `/doctors/${doctorsId}`,
  DELETE_USER: (userId) => `/users/${userId}/delete`,
  SUBSCRIPTION: "/subscriptions",
  VERIFY_SUBSCRIPTIONS: "/subscriptions/verify",
  GET_CREDIT_PURCHASED: "/analytic/credit-purchased?month=4&year=2022",

  GET_CHATS: (doctorsId, patientId) =>
    `/doctors/messages?doctorId=${doctorsId}&userId=${patientId}&limit=500`,
  GET_CONVERSATIONS: (doctorsId) =>
    `/doctors/conversations?doctorId=${doctorsId}&sort=desc`,
  // ADD_PATIENT_NOTE: (patientId) => `/doctors/patient/${patientId}`,
  LOCK_CONVERSATION: (id) => `/conversation/${id}/lock-status`,
  UNLOCK_CONVERSATION: (id) => `/conversation/${id}/lock-status`,
  INITIATE_CONVERSATION: `/doctors/chat/initiate`,

  ADD_PATIENT_NOTE: "/doctors/patient-note",
  GET_RECENT_PATIENT_NOTES: (docId, patientId) =>
    `/doctors/patient-note?doctorId=${docId}&userId=${patientId}&sort=desc`,

  // LOCK_CONVERSATION:(id)=>  `/conversation/${id}/lock-status`,

  GET_DOCTOR_SCHEDULES: (doctorId, date) =>
    `/doctors/schedules?doctorId=${doctorId}&date=${date}&sort=desc&limit=100`,
  GET_SCHEDULES: (filter) => `/doctors/schedules${filter}&sort=desc`,
  GET_ALL_SCHEDULES: (filter) => `/doctors/schedules/all${filter}&sort=desc`,
  TRANSFER_BOOKINGS: (doctorId, bookingId) =>
    `/doctors/bookings/${bookingId}/transfer?doctorId=${doctorId}`,
  UPDATE_BOOKINGS: (bookingId) => `/doctors/bookings/${bookingId}/status`,
  SET_AVAILABILITY: `/doctors/availability`,
  GET_APPOINTMENT_NOTIFICATIONS: `/doctors/notifications?limit=60&data=appointments&sort=desc`,

  GET_ALL_NOTIFICATIONS: `/doctors/notifications?limit=60&sort=desc`,
  GET_PATIENTS: ({ doctorId, skip, limit }) =>
    `/doctors/patients?doctorId=${doctorId}&skip=${skip}&limit=${limit}`,
  UPDATE_BANK_DETAILS: `/doctors/account-details`,
  //GET_PATIENTS: (doctorsId) => `/doctors/patients?doctorId=62668bcd344ac60af03f950f`,
  GET_TOTAL_USER: () => `/users`,
  //GET_NOTIFICATIONS: (recipientId) => `/notifications?recipientId=62668bcd344ac60af03f950f`
  RESCHEDULE_BOOKING: (bookingId) =>
    `/doctors/bookings/${bookingId}/reschedule`,
  GET_DOCTOR_INFORMATION: (doctorId) => `/doctors?_id=${doctorId}`,
  UPDATE_AVAILABILITY: (doctorId) => `doctors/availability-status/${doctorId}`,
  DOCTOR_SEARCH_USER: (searchTerm, doctorId) =>
    `/doctors/user-search?search=${searchTerm}&doctorId=${doctorId}`,

  INITIATE_CHAT: "/doctors/chat/initiate",
  UPDATE_PASSWORD: "/doctors/password",
  GET_SCHEDULED_DATES: (doctorId, date) =>
    `/doctors/schedules?status=APPROVED&doctorId=${doctorId}&date=${date}`,
  SEARCH_CONTACT: (search) =>
    `/doctors/chat-conversations/search?search=${search}`,
  GET_PENDING_PATIENTS: ({ month, year, doctorId }) =>
    `/doctors/schedules/month?doctorId=${doctorId}&month=${month}&year=${year}`,
  GET_TOTAL_SCHEDULES: (doctorId) => `/doctors/schedules?doctorId=${doctorId}`,
};
