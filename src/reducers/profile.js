import { handleActions } from "redux-actions";
import { PresenceSuccess } from "../screens/ProfileScreen/actions";

const initialState = {
  status: "null",
};

export const profile = handleActions(
  {
    [PresenceSuccess](state, { payload }) {
      return { ...state, status: payload };
    },
  },
  initialState
);