import { handleActions } from "redux-actions";
import { PresenceError } from "../actions";
import { CheckPresenceSuccess } from "../screens/QRScanerScreen/actions";

const initialState = {
  success: "",
  fail: "",
};

export const qr = handleActions(
  {
    [CheckPresenceSuccess](state, { payload }) {
      return { ...state, success: payload };
    },
    [PresenceError](state, { payload }) {
      return { ...state, error: payload.error };
    },
  },
  initialState
);