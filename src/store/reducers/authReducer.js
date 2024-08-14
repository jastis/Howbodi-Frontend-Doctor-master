import { authSetUser, updateBrandColor } from "../actions/authAction"
/**
 *
 * @param {*} state
 * @param {*} action
 * @return {*}
 *
 *
 */
const brandColor = JSON.parse(localStorage.getItem("brandColor")) || "#0168DA"
function r(state = { authenticated: false, brandColor }, action) {
  switch (action.type) {
    case authSetUser.type:
      return {
        ...state,
        docId: action.payload?.email?.id,
        email: action.payload?.email?.email,
      };

    case updateBrandColor.type:
      return {
        ...state,
        brandColor: action.payload?.brandColor,
      };

    // case toggleState.type:
    //   return {
    //     ...state,
    //     newState: action.payload,
    //   };
    default:
      return state;
  }
}

export default r
