import { createAction } from "@reduxjs/toolkit";

export const getIncomingCallData = createAction(
  "incomingCallData",
  (idsObj) => {
    return {
      payload: idsObj,
    };
  }
);
export const clearCallState = createAction("clearCallState", () => {
  return {
    payload: true,
  };
});

export const openVideoCall = createAction("openVideoCall", (bool) => {
  return {
    payload: bool,
  };
});
export const openAudioCall = createAction("openAudioCall", (bool) => {
  return {
    payload: bool,
  };
});
