import { createStore, combineReducers } from "redux";
// import thunk from 'redux-thunk';
import authReducer from "./reducers/authReducer";
import displayReducer from "./reducers/displayReducer";
import incomingCallReducer from "./reducers/incomingCallReducer";
import timerReducer from "./reducers/timerReducer";

const store = createStore(
  combineReducers({
    auth: authReducer,
    switchTab: displayReducer,
    startTimer: timerReducer,
    getIncomingCallData: incomingCallReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // applyMiddleware(thunk)
);

export default store;
