import { createAction } from "redux-actions";
import { Alert } from "react-native";
import NavigationService from "../../navigationService/NavigationService";

import { MAIN_SCREEN } from "../../constants";
import { logInNetworkRequest } from "../../networkers";
import { setAccessToken, setError } from "../../actions";
import { saveUserToken } from "../../utils";

export const logInRequest = createAction("LOG_IN_REQUEST");
export const logInSuccess = createAction("LOG_IN_SUCCESS");
export const logInFailure = createAction("LOG_IN_FAILURE");

export const logIn = login => async (dispatch) => {
  // dispatch(logInRequest());

  // const response = await logInNetworkRequest(login);
  // console.log(response);
  // switch(response.isAuthorized) {
  //   case true:
  //     dispatch(setAccessToken({ token: response.token }));
  //     await saveUserToken(response.token);
  //     dispatch(logInSuccess());
  //     NavigationService.navigate(MAIN_SCREEN, {
  //       userId: login,
  //       userName: response.name,
  //     });
  //     break;
  //   case false:
  //     dispatch(setError({ error: "Server error" }));
  //     dispatch(logInFailure());
  //     break;

  //   default:
  //     dispatch(setError({ error: "Server error" }));
  //     dispatch(logInFailure());
  //     break;
  // }
  dispatch(logInRequest());
  try {
    const response = await logInNetworkRequest(login);
    dispatch(setAccessToken({ token: response.token }));
    await saveUserToken(response.token);
    dispatch(logInSuccess());
    NavigationService.navigate(MAIN_SCREEN, {
      userId: login,
    });
  }
  catch(error) {
    dispatch(setError({ error: "wrong login" }));
    Alert.alert("Не корректные данные!");
    dispatch(logInFailure({ error }));
  }
};