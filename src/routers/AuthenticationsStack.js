import { createStackNavigator } from "react-navigation";
import React from 'react';

import { AuthenticationScreen } from "../screens/AuthenticationScreen";
import { AUTHENTICATION_SCREEN } from "../constants";

const AuthenticationStack = createStackNavigator(
  {
    [AUTHENTICATION_SCREEN]: {
      screen: AuthenticationScreen
    }
  },
  {
    initialRouteName: AUTHENTICATION_SCREEN
  }
);

export default AuthenticationStack;
