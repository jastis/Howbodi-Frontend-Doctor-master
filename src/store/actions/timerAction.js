import { createAction } from "@reduxjs/toolkit";

export const setStartTimer = createAction("setStartTimer", (time) => {
  return {
    payload: time,
  };
});

export const deleteStartTimer = createAction("deleteStartTimer");
