import React from "react";
import styled from "styled-components";
import { View, Text, StyleSheet, Image } from "react-native";

import { colors } from "../constants/colors";

export const JustText = styled.Text`
  font-size: 12;
  color: ${colors.dataColor};
`;

export const Conference = ({ name, dateStart, dateEnd, place }) => {
  const monthStart =
    new Date(dateStart).getMonth() + 1 >= 9
      ? new Date(dateStart).getMonth() + 1
      : `0${new Date(dateStart).getMonth() + 1}`;

      const monthEnd =
      new Date(dateEnd).getMonth() + 1 >= 9
        ? new Date(dateEnd).getMonth() + 1
        : `0${new Date(dateEnd).getMonth() + 1}`;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={styles.textStyle}>{name}</Text>
        <Text>{place}</Text>
        <JustText>
          {
            `${new Date(dateStart).getDate()}.${monthStart}.${new Date(dateStart)
            .getFullYear()} - ${new Date(dateEnd).getDate()}.${monthEnd}.${new Date(dateEnd)
            .getFullYear()}`
          }
        </JustText>
      </View>
      <Image source={require("../../assets/arrow-right.png")} style={styles.arrowStyle} />
    </View>
  );
};

export const Section = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{name}</Text>
      <Image source={require("../../assets/arrow-right.png")} style={styles.arrowStyle} />
    </View>
  );
};

export const SubSection = ({ name, reportsCount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{name}</Text>
      <Text>{reportsCount}</Text>
      <Image source={require("../../assets/arrow-right.png")} style={styles.arrowStyle} />
    </View>
  );
};

export const Reports = ({ name, info }) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: "column"}}>
        <Text style={styles.textStyle}>{name}</Text>
        <JustText>{`${info} мин.`}</JustText>
      </View>
      <Image source={require("../../assets/arrow-right.png")} style={styles.arrowStyle} />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: colors.bgPrice,
    shadowOffset: {width: 5, height: 0},
    shadowColor:"rgba(0, 0, 0, 0.05)",
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  textStyle:{
    fontSize: 16,
    fontWeight: "700",
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
  },
  arrowStyle: {
    // alignSelf: "flex-end",
    width: 28,
    height: 28,
  },
});
