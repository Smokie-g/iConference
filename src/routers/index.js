import { createSwitchNavigator, createAppContainer } from "react-navigation";

import TabNavigator from "./TabNavigator";
import AuthenticationStack from "./AuthenticationsStack";

import { TAB_NAVIGATOR, AUTHENTICATION_STACK } from "../constants";

const root = createSwitchNavigator(
  {
    [AUTHENTICATION_STACK]: {
      screen: AuthenticationStack
    },
    [TAB_NAVIGATOR]: {
      screen: TabNavigator
    },
  },
  {}
);

export default createAppContainer(root);
