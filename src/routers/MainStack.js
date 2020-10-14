import { createStackNavigator } from "react-navigation";

import { MainScreen } from "../screens";
import { SectionScreen } from "../screens/SectionScreen";
import { SubSectionScreen } from "../screens/SubSectionScreen";
import { ReportsScreen } from "../screens/ReportsScreen";
import { ReportsDetailScreen } from "../screens/ReportsDetailScreen";

import {
  MAIN_SCREEN,
  SECTION_SCREEN,
  SUB_SECTION_SCREEN,
  REPORTS_SCREEN,
  REPORTS_DETAIL_SCREEN
} from "../constants";

const MainStack = createStackNavigator(
  {
    [MAIN_SCREEN]: {
      screen: MainScreen
    },
    [SECTION_SCREEN]: {
      screen: SectionScreen
    },
    [SUB_SECTION_SCREEN]: {
      screen: SubSectionScreen
    },
    [REPORTS_SCREEN]: {
      screen: ReportsScreen
    },
    [REPORTS_DETAIL_SCREEN]: {
      screen: ReportsDetailScreen
    },
  },
  {
    initialRoutname: MAIN_SCREEN,
  }
);

export default MainStack;