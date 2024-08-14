import { deleteStartTimer, setStartTimer } from "../actions/timerAction";

/**
 *
 * @param {*} state
 * @param {*} action
 * @return {*}
 *
 *
 */
function timerReducer(state = {}, action) {
  switch (action.type) {
    case setStartTimer.type:
      return {
        ...state,
        ...action.payload,
      };
    case deleteStartTimer.type:
      return {};

    default:
      return state;
  }
}

export default timerReducer;
