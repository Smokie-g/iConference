import { createAction } from "redux-actions";

import { deleteAccessToken, logOutRequest, logOutSuccess } from "../../actions";
import { deleteUserToken, deleteUserPeresence } from "../../utils";
import { AUTHENTICATION_SCREEN } from "../../constants";

import NavigationService from "../../navigationService/NavigationService";

export const logOut = () => async dispatch => {
  dispatch(logOutRequest());
  dispatch(deleteAccessToken());
  await deleteUserToken();
  await deleteUserPeresence();
  dispatch(logOutSuccess());

  NavigationService.navigate(AUTHENTICATION_SCREEN);
};

