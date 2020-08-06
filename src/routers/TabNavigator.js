import { createBottomTabNavigator } from "react-navigation";
import React from "react";
import { Image } from "react-native";
import MainStack from "./MainStack";
import NewsStack from "./NewsStack";
import ProfileStack from "./ProfileStack";
import { colors } from "../constants";

const TabNavigator = createBottomTabNavigator(
    {
      Конференции: {
        screen: MainStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ height: 30, width: 30, tintColor: tintColor, resizeMode: "contain" }}
              source={require('../../assets/pricelist-svg.png')}
            />),
        }
      },
      Новости: {
        screen: NewsStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ height: 30, width: 30, tintColor: tintColor, resizeMode: "contain" }}
              source={require('../../assets/notifications.png')}
            />),
        }
      },
      Профиль: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ height: 30, width: 30, tintColor: tintColor, resizeMode: "contain" }}
              source={require('../../assets/account.png')}
            />
          ),
        },
      },
    },
    {
      initialRouteName: 'Конференции',
      tabBarOptions:{
        activeTintColor: colors.colorPrimary,
        inactiveTintColor: colors.dataColor,
        showLabel: false
      }
    },
  );
  
  export default TabNavigator;
