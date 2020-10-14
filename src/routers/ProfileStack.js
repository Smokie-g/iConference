import { createStackNavigator } from "react-navigation";
import React from 'react';

import { ProfileScreen } from "../screens/ProfileScreen";

import { PROFILE_SCREEN } from "../constants";

import { QRScanerScreen } from "../screens/QRScanerScreen";

import { QR_SCANER_SCREEN } from "../constants";

const ProfileStack = createStackNavigator(
  {
    [PROFILE_SCREEN]: {
      screen: ProfileScreen
    },
    [QR_SCANER_SCREEN]: {
      screen: QRScanerScreen
    },
  },
  {
    initialRoutname: PROFILE_SCREEN,
  }
);

export default ProfileStack;