import http, { AUTH_ROUTES } from "../../../services/api";

export const getPatientProfile = async (
  docId,
  patientId,
  setPatientProfile,
  setIsLoaded
) => {
  setIsLoaded(false);
  try {
    const {
      data: { patient },
    } = await http.get(AUTH_ROUTES.GET_RECENT_PATIENT_NOTES(docId, patientId));
    setPatientProfile(patient);
    setIsLoaded(true);
  } catch (error) {
    return null;
  } finally {
    setIsLoaded(true);
  }
};
