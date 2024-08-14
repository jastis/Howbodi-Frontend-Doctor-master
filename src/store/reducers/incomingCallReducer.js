import {
  clearCallState,
  getIncomingCallData,
  openAudioCall,
  openVideoCall,
} from "../actions/incomingCallAction";

/**
 *
 * @param {*} state
 * @param {*} action
 * @return {*}
 *
 *
 */

function incomingCallReducer(state = {}, action) {
  switch (action.type) {
    case getIncomingCallData.type:
      return {
        incomingCall: action.payload,
      };
    case openVideoCall.type:
      return {
        openVideoCall: action.payload,
        openAudioCall: false,
        ring: false,

        incomingCall: {},
      };

    case openAudioCall.type:
      return {
        openAudioCall: action.payload,
        openVideoCall: false,
        ring: false,

        incomingCall: {},
      };
    case clearCallState.type:
      return {
        incomingCall: {},
        ring: false,
      };
    default:
      return state;
  }
}

export default incomingCallReducer;
