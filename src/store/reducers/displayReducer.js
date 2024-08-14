import {
  toggleState,
  updateBrandColor,
  userOnlineStatus,
} from "../actions/displayAction";
/**
 *
 * @param {*} state
 * @param {*} action
 * @return {*}
 *
 *
 */
const brandColor = JSON.parse(localStorage.getItem("brandColor")) || "#2a9d8f";
function displayReducer(state = { brandColor }, action) {
  switch (action.type) {
    case toggleState.type:
      return {
        ...state,
        currentDisplay: action.payload,
      };
    case updateBrandColor.type:
      return {
        ...state,
        brandColor: action.payload?.brandColor,
      };
    case userOnlineStatus.type:
      return {
        ...state,
        onlineStatus: action.payload,
      };
    default:
      return state;
  }
}

export default displayReducer;
