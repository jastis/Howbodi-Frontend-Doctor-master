import { createAction } from "@reduxjs/toolkit";

export const toggleState = createAction("changeState", (state) => {
  return {
    payload: state,
  };
});

export const userOnlineStatus = createAction("userOnlineStatus", (state) => {
  return {
    payload: state,
  };
});

export const updateBrandColor = createAction("brandColor", (color) => {
  return {
    payload: { brandColor: color },
  };
});
