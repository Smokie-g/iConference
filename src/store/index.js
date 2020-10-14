import { combineReducers } from "redux";

import { mainReducer, auth, qr, profile } from "../reducers";

const rootReducer = combineReducers({
  mainReducer,
  auth,
  qr,
  profile,
});

export default (state, action) => {
  let newState = state;

  return rootReducer(newState, action);
};
