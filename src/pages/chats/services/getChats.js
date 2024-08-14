// import { errorNotifier, successNotifier } from "../../../components/NotificationHandler";
import http, { AUTH_ROUTES } from "../../../services/api";

export const getChats = async (doctorId, patientId, setChats, setLoading) => {
  try {
    // const {
    //   data: { result },
    // }
    const result = await http.get(AUTH_ROUTES.GET_CHATS(doctorId, patientId));
    //    successNotifier("Withdrawal successfully created")
    setChats(result?.data?.withdrawal?.data?.withdrawals);
    setLoading(false);
  } catch (e) {
    setLoading(false);
    // errorNotifier(e.response?.data?.data);
  }
};

export const getConversations = async (doctorId) => {
  const result = await http.get(AUTH_ROUTES.GET_CONVERSATIONS(doctorId));
  return result.data?.result?.data?.conversations;
  // const result = await http.get(AUTH_ROUTES.GET_USERS);
  // return result.data?.userDetails?.data?.users
};

export const getChatMessages = async (doctorId, patientId, setMessages) => {
  const result = await http.get(AUTH_ROUTES.GET_CHATS(doctorId, patientId));
  setMessages && setMessages([...result.data?.result?.data?.chats]);
  return result.data?.result?.data?.chats;
};

// export const addPatientNote = async (patientId,data) => {
//     const result = await http.put(AUTH_ROUTES.ADD_PATIENT_NOTE(patientId),data);
//     return result
// };

export const lockConversation = async (id, status) => {
  const resp = await http.put(AUTH_ROUTES.LOCK_CONVERSATION(id), {
    isLocked: status,
  });
  return resp.data;
};
export const unlockConversation = async (conversationId) => {
  try {
    const resp = await http.put(
      AUTH_ROUTES.UNLOCK_CONVERSATION(conversationId),
      {
        isLocked: false,
      }
    );
  } catch (e) {
    return null;
  }
};
