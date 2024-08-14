import { createAction } from "@reduxjs/toolkit";

export const authSetUser = createAction("auth/setUser", (idsObj) => {
  return {
    payload: idsObj,
  };
});

export const updateBrandColor = createAction("brandColor", (color) => {
  return {
    payload: { brandColor: color },
  };
});

// export const toggleState = createAction("changeState", (state) => {
//   return {
//     payload: state,
//   };
// });
