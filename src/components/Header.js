import React from "react";
import { Platform } from "react-native";
import styled from "styled-components";

const IOS = styled.Text`
  flex: 1;
  height: 100%;
  align-items: center;
  margin-bottom: 5;
  text-align: center;
  font-size: 20;
  font-weight: 700;
`;

const Android = styled.Text`
  flex: 1;
  align-items: center;
  text-align: center;
  font-size: 20;
  font-weight: 700;
`;

export const Header = ({ title, color }) =>
  Platform.OS === "ios"
    ? <IOS style={{ color: color }} numberOfLines={2} elliosizeMode={"tail"}>{title}</IOS>
    : <Android style={{ color: color }}>{title}</Android>;
