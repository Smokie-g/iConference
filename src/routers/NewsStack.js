import { createStackNavigator } from "react-navigation";

import { NewsScreen } from "../screens/NewsScreen";

import { NEWS_SCREEN } from "../constants";

const NewsStack = createStackNavigator(
  {
    [NEWS_SCREEN]: {
      screen: NewsScreen
    },
  },
  {
    initialRoutname: NEWS_SCREEN,
  }
);

export default NewsStack;