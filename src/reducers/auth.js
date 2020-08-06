import { handleActions } from "redux-actions";
import { deleteAccessToken, setAccessToken, setError } from "../actions";

const initialState = {
    accessToken: "",
    error: "",
};

export const auth = handleActions(
    {
        [setAccessToken](state, { payload }) {
            return { ...state, accessToken: payload.token };
        },
        [setError](state, { payload }) {
            return { ...state, error: payload.error };
        },
        [deleteAccessToken](state) {
            return { ...state, accessToken: "" };
        },
    },
    initialState
);