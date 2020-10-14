import { createAction } from "redux-actions";

import { getUserToken, saveUserPresence } from "../../utils";

import { PresenceError } from "../../actions";

import { PresenceCheckNetworkRequest } from "../../networkers";

export const CheckPresenceRequest = createAction("CHECK_PRESENCE_REQUEST");
export const CheckPresenceSuccess = createAction("CHECK_PRESENCE_SUCCESS");
export const CheckPresenceFailure = createAction("CHECK_PRESENCE_FAILURE");

export const checkPresence = (value) => async dispatch => {
  dispatch(CheckPresenceRequest());
  const token = await getUserToken();

  try {
    const response = await PresenceCheckNetworkRequest(value, token);
    dispatch(CheckPresenceSuccess("OK"));
    await saveUserPresence("OK");
  } catch(e) {
    dispatch(PresenceError({ error: "Wrong request" }));
    dispatch(CheckPresenceFailure())
  }
};