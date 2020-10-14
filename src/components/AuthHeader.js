import React from "react";
import { Platform } from "react-native";
import styled from "styled-components";

import { colors } from "../constants";

const IOS = styled.Text`
  flex: 1;
  text-align: left;
  font-size: 30;
  margin-left: 20;
  color: ${colors.textColorPrimary};
`;

const Android = styled.Text`
  flex: 1;
  text-align: left;
  font-size: 30;
  margin-left: 20;
  color: ${colors.textColorPrimary};
`;

export const AuthHeader = ({ title }) =>
  Platform.OS === "ios"
    ? <IOS numberOfLines={2} elliosizeMode={'tail'}>{title}</IOS>
    : <Android>{title}</Android>;